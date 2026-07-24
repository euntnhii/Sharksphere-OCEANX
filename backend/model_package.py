import numpy as np
import pandas as pd
import joblib
from math import ceil
import time

FEATURE_ORDER = [
    "Apex_Predators",
    "Herbivore_Scrapers",
    "Turf_Brushers",
    "Invertebrate_Prey_Hunters",
    "Small_Invertebrates",
]


def decision_function_single_tree(iforest, tree_idx, X):
    return _score_samples(iforest, tree_idx, X) - iforest.offset_


def _score_samples(iforest, tree_idx, X):
    if iforest.n_features_in_ != X.shape[1]:
        raise ValueError(
            f"Number of features of the model must match the input. "
            f"Model n_features is {iforest.n_features_in_} and input n_features is {X.shape[1]}."
        )
    return -_compute_chunked_score_samples(iforest, tree_idx, X)


def _compute_chunked_score_samples(iforest, tree_idx, X):
    from sklearn.utils.validation import _num_samples
    from sklearn.utils import gen_batches
    from sklearn.utils._chunking import get_chunk_n_rows
    from sklearn.ensemble._iforest import _average_path_length

    n_samples = _num_samples(X)
    subsample_features = (iforest._max_features != X.shape[1])
    chunk_n_rows = get_chunk_n_rows(
        row_bytes=16 * iforest._max_features, max_n_rows=n_samples)
    slices = gen_batches(n_samples, chunk_n_rows)
    scores = np.zeros(n_samples, order="f")
    for sl in slices:
        scores[sl] = _compute_score_samples_single_tree(
            iforest, tree_idx, X[sl], subsample_features
        )
    return scores


def _compute_score_samples_single_tree(iforest, tree_idx, X, subsample_features):
    from sklearn.ensemble._iforest import _average_path_length

    n_samples = X.shape[0]
    depths = np.zeros(n_samples, order="f")
    tree = iforest.estimators_[tree_idx]
    features = iforest.estimators_features_[tree_idx]
    X_subset = X[:, features] if subsample_features else X
    leaves_index = tree.apply(X_subset)
    node_indicator = tree.decision_path(X_subset)
    n_samples_leaf = tree.tree_.n_node_samples[leaves_index]
    depths += (np.ravel(node_indicator.sum(axis=1)) +
               _average_path_length(n_samples_leaf) - 1.0)
    scores = 2 ** (-depths /
                   (1 * _average_path_length([iforest.max_samples_])))
    return scores


def _get_iic(estimator, predictions, is_leaves, adjust_iic):
    desired_min, desired_max, epsilon = 0.5, 1.0, 0.0
    n_nodes = estimator.tree_.node_count
    lambda_ = np.zeros(n_nodes)
    children_left = estimator.tree_.children_left
    children_right = estimator.tree_.children_right
    node_indicator_all_samples = estimator.decision_path(predictions).toarray()
    num_samples_in_node = np.sum(node_indicator_all_samples, axis=0)

    for node in range(n_nodes):
        num_samples_in_current_node = num_samples_in_node[node]
        num_samples_in_left_children = num_samples_in_node[children_left[node]]
        num_samples_in_right_children = num_samples_in_node[children_right[node]]

        if num_samples_in_current_node == 0 or num_samples_in_current_node == 1 or is_leaves[node]:
            lambda_[node] = -1
        elif num_samples_in_left_children == 0 or num_samples_in_right_children == 0:
            lambda_[node] = epsilon
        else:
            if num_samples_in_current_node % 2 == 0:
                current_min = 0.5
            else:
                current_min = ceil(num_samples_in_current_node /
                                   2) / num_samples_in_current_node
            current_max = (num_samples_in_current_node - 1) / \
                num_samples_in_current_node
            tmp = np.max([num_samples_in_left_children,
                         num_samples_in_right_children]) / num_samples_in_current_node
            if adjust_iic and current_min != current_max:
                lambda_[node] = ((tmp - current_min) / (current_max -
                                 current_min)) * (desired_max - desired_min) + desired_min
            else:
                lambda_[node] = tmp
    return lambda_


def local_diffi(iforest, x):
    start = time.time()
    estimators = iforest.estimators_
    cfi = np.zeros(len(x)).astype("float")
    counter = np.zeros(len(x)).astype("int")
    max_depth = int(np.ceil(np.log2(iforest.max_samples_)))

    for estimator in estimators:
        n_nodes = estimator.tree_.node_count
        children_left = estimator.tree_.children_left
        children_right = estimator.tree_.children_right
        feature = estimator.tree_.feature
        node_depth = np.zeros(shape=n_nodes, dtype=np.int64)
        is_leaves = np.zeros(shape=n_nodes, dtype=bool)

        stack = [(0, -1)]
        while len(stack) > 0:
            node_id, parent_depth = stack.pop()
            node_depth[node_id] = parent_depth + 1
            if children_left[node_id] != children_right[node_id]:
                stack.append((children_left[node_id], parent_depth + 1))
                stack.append((children_right[node_id], parent_depth + 1))
            else:
                is_leaves[node_id] = True

        x_reshaped = x.reshape(1, -1)
        node_indicator = estimator.decision_path(x_reshaped)
        node_indicator_array = node_indicator.toarray()
        path = list(np.where(node_indicator_array == 1)[1])
        leaf_depth = node_depth[path[-1]]
        for node in path:
            if not is_leaves[node]:
                current_feature = feature[node]
                cfi[current_feature] += (1 / leaf_depth) - (1 / max_depth)
                counter[current_feature] += 1

    fi = np.zeros(len(cfi))
    for i in range(len(cfi)):
        if counter[i] != 0:
            fi[i] = cfi[i] / counter[i]

    exec_time = time.time() - start
    return fi, exec_time


def prepare_input(data):
    df = pd.DataFrame(data)
    missing = [col for col in FEATURE_ORDER if col not in df.columns]
    if missing:
        raise ValueError(f"Missing required columns: {missing}")
    return df[FEATURE_ORDER].astype(float)


class IFDiffiPackage:
    def __init__(self, model, feature_order):
        self.model = model
        self.feature_order = list(feature_order)

    def predict_one(self, row):
        X = prepare_input([row])[self.feature_order]
        x = X.iloc[0].to_numpy()

        pred = int(self.model.predict(X)[0])
        score = float(self.model.score_samples(X)[0])
        diffi_scores, exec_time = local_diffi(self.model, x)

        return {
            "prediction": pred,
            "anomaly_score": score,
            "diffi_scores": dict(zip(self.feature_order, diffi_scores.tolist())),
            "diffi_runtime_sec": float(exec_time),
        }

    def predict_batch(self, data):
        X = prepare_input(data)[self.feature_order]
        preds = self.model.predict(X)
        scores = self.model.score_samples(X)

        diffi_out = []
        for i in range(len(X)):
            fi, exec_time = local_diffi(self.model, X.iloc[i].to_numpy())
            diffi_out.append({
                "prediction": int(preds[i]),
                "anomaly_score": float(scores[i]),
                "diffi_scores": dict(zip(self.feature_order, fi.tolist())),
                "diffi_runtime_sec": float(exec_time),
            })
        return diffi_out


def export_package(iforest, path="sharksphere_if_diffi.joblib"):
    package = IFDiffiPackage(iforest, FEATURE_ORDER)
    joblib.dump(package, path)
    return path


def load_package(path="sharksphere_if_diffi.joblib"):
    return joblib.load(path)

# after training:
# export_package(IF, "sharksphere_if_diffi.joblib")

# usage anywhere in Python:
# pkg = load_package("sharksphere_if_diffi.joblib")
# result = pkg.predict_one({
#     "Apex_Predators": 4,
#     "Herbivore_Scrapers": 18,
#     "Turf_Brushers": 12,
#     "Invertebrate_Prey_Hunters": 7,
#     "Small_Invertebrates": 35,
# })
# print(result)