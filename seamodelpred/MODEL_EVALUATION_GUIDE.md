# Model Evaluation Report: Reef Fish Anomaly Attribution Model

## Executive Summary

Your **Isolation Forest + DIFFI** model for anomaly detection and feature attribution in reef fish survey data has been prepared for comprehensive testing and evaluation. This report outlines the testing methodology, key metrics, and provides guidance on model performance assessment.

---

## 1. Model Overview

**Model Type:** Isolation Forest (Unsupervised Anomaly Detection)  
**Feature Attribution Method:** DIFFI (Diverse Feature Importance)  
**Dataset:** IMOS Reef Fish Surveys  
**Features:** Species counts from 4 shark surveys (originally 1,210 species)

### Model Architecture
- **Primary Model:** Isolation Forest
  - 100 decision trees
  - 10% contamination rate (expects ~10% anomalies)
  - Random state: 42
  - Automatically optimized max samples per tree

- **Attribution Method:** DIFFI
  - Global attribution via `diffi_ib()` 
  - Local explanation via `local_diffi()`
  - Provides feature-level importance scores for each anomaly

---

## 2. Testing Strategy

### Data Splitting
```
Total Samples: 806 (after transpose)
├─ Training Set (85%): 685 samples
└─ Test Set (15%): 121 samples
```

**Feature Reduction:** Top 50 species by prevalence used to reduce noise

### Training Process
1. Load 4 shark species survey data
2. Transpose to get surveys as rows, species as columns
3. Select top 50 most prevalent species
4. Train Isolation Forest on 85% of data
5. Test on remaining 15%

---

## 3. Key Evaluation Metrics

### A. Anomaly Detection Performance

| Metric | How to Measure | Good Range |
|--------|----------------|------------|
| **Anomaly Detection Rate** | % of test samples flagged as anomalies | ~10% (matches contamination) |
| **Score Separation** | Mean normal score - Mean anomaly score | > 0.05 (clear separation) |
| **Score Consistency** | Std Dev of scores within class | < 0.1 (tight clustering) |

### B. Anomaly Scores

Isolation Forest produces anomaly scores:
- **Positive score** → Normal sample
- **Negative score** → Anomalous sample
- **Magnitude** → Degree of abnormality

**Score ranges to monitor:**
- Normal samples: typically -0.5 to 0.5
- Anomalies: typically -1.0 to -0.5

### C. Feature Attribution (DIFFI)

**Global Importance (diffi_ib):**
- Identifies which species globally contribute most to anomaly detection
- Helps understand model bias

**Local Importance (local_diffi):**
- For each detected anomaly, shows which species caused the flag
- Enables interpretable anomaly explanations

---

## 4. Test Execution Procedure

### Step 1: Run Basic Predictions
```python
test_predictions = IF.predict(df_test)
test_scores = IF.score_samples(df_test)

n_normal = (test_predictions == 1).sum()
n_anomalies = (test_predictions == -1).sum()
```

**Expected Output:**
```
Total Test Samples: 121
Normal: ~109 samples (90%)
Anomalies: ~12 samples (10%)
```

### Step 2: Score Statistics
```python
normal_scores = test_scores[test_predictions == 1]
anomaly_scores = test_scores[test_predictions == -1]

print(f"Normal Mean: {normal_scores.mean():.4f}")
print(f"Anomaly Mean: {anomaly_scores.mean():.4f}")
print(f"Separation: {normal_scores.mean() - anomaly_scores.mean():.4f}")
```

### Step 3: Feature Attribution
```python
# Global
fi_global, _ = diffi_ib(IF, df_train.values)
global_importance = pd.Series(fi_global, index=df_train.columns).sort_values(ascending=False)

# Local (for each anomaly)
for idx in anomaly_indices:
    x = df_test.iloc[idx].values
    fi_local, _ = local_diffi(IF, x)
    print(f"Anomaly {idx}: Top contributing species: {top_species_for_anomaly}")
```

### Step 4: Visualization
- Score histograms (normal vs anomaly)
- Box plots comparing distributions
- Bar charts of top discriminative species
- Scatter plots of feature pairs

---

## 5. Model Scoring Criteria

### Good Performance ✓
- Anomaly detection rate ~10% (matches contamination parameter)
- Score separation > 0.05 (clear distinction)
- Detected anomalies have coherent patterns (unusual species combinations)
- DIFFI shows consistent top contributors

### Fair Performance ⚠
- Detection rate 5-15% (wider but acceptable range)
- Score separation 0.01-0.05 (some separation, but subtle)
- Anomalies somewhat scattered, less obvious patterns

### Poor Performance ✗
- Detection rate << 5% or >> 15%
- Score separation near 0 (no distinction)
- Random anomaly selection (no clear pattern)
- DIFFI shows random species (model noise)

---

## 6. Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| No anomalies detected | Contamination rate too low | Increase contamination parameter |
| Too many anomalies | Contamination rate too high | Decrease contamination parameter |
| Poor score separation | Model underfitting | Increase n_estimators, tune max_samples |
| Inconsistent results | High randomness | Check random_state is set |
| All species equally important | Feature noise | Use PCA or select better features |

---

## 7. Model Interpretation Examples

### Example 1: Normal Survey
```
Survey #45 - Score: 0.25 (Normal)
Top Species:
  - Ctenochaetus striatus: 5
  - Labroides dimidiatus: 3
  - Thalassoma lunare: 7
  
Interpretation: Typical reef survey with herbivore and cleaner presence
```

### Example 2: Anomalous Survey  
```
Survey #12 - Score: -0.89 (Anomaly)
Top Species:
  - Species A: 45 (extremely high)
  - Species B: 0 (missing)
  - Species C: 0 (missing)

Feature Attribution (DIFFI):
  - Species A: 0.78 (primary contributor to anomaly)
  - Species B: 0.15 (absence detected)

Interpretation: Dominated by single species, unusual ecological composition
```

---

## 8. Running Full Evaluation in Notebook

Add these cells to your notebook:

```python
# Cell 1: Setup
from sklearn.ensemble import IsolationForest
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Cell 2: Prepare data
df_train = df.sample(frac=0.85, random_state=42)
df_test = df.drop(df_train.index)

# Cell 3: Train model
IF = IsolationForest(contamination=0.1, random_state=42, n_estimators=100)
IF.fit(df_train)

# Cell 4: Test predictions
test_predictions = IF.predict(df_test)
test_scores = IF.score_samples(df_test)

# Cell 5: Evaluation metrics
n_normal = (test_predictions == 1).sum()
n_anomalies = (test_predictions == -1).sum()
print(f"Normal: {n_normal}, Anomalies: {n_anomalies}")

# Cell 6: Feature attribution
fi_global, _ = diffi_ib(IF, df_train.values)
global_importance = pd.Series(fi_global, index=df_train.columns).sort_values(ascending=False)

# Cell 7: Visualization
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
# [Add visualization code here]
```

---

## 9. Next Steps

1. **Execute Test Cells:** Run the evaluation cells above in your notebook
2. **Review Metrics:** Compare actual metrics to "Good Performance" criteria
3. **Tune if Needed:** Adjust contamination rate if detection rate is off
4. **Validate Anomalies:** Manually inspect flagged surveys for correctness
5. **Document Results:** Save evaluation plots and metrics summary

---

## 10. Key Takeaways

✓ Your model is ready for testing  
✓ DIFFI provides interpretable explanations  
✓ Use 85/15 train/test split for validation  
✓ Target ~10% anomaly detection rate  
✓ Separate normal/anomaly scores are indicators of model quality  
✓ Feature attribution helps validate if anomalies make ecological sense

---

**Generated:** 2026-07-02  
**Model Type:** Isolation Forest + DIFFI  
**Dataset:** IMOS Reef Fish Surveys (4 shark surveys)
