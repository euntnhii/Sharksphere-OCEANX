import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv('IMOS/4shark_surveys_species_count.csv')

# Transpose and prepare
df_T = df.set_index("species_name").T
df_T.index.name = None
df_T = df_T.reset_index(drop=True)
df_T = df_T.rename_axis(None, axis=1)

# Select top 50 species
species_counts = df_T.sum(axis=0).sort_values(ascending=False)
top_species = species_counts.head(50).index.tolist()
df_reduced = df_T[top_species].copy()

# Split data
df_train = df_reduced.sample(frac=0.85, random_state=42)
df_test = df_reduced.drop(df_train.index)

# Train model
IF = IsolationForest(contamination=0.1, random_state=42, n_estimators=100)
IF.fit(df_train)

# Test predictions
test_predictions = IF.predict(df_test)
test_scores = IF.score_samples(df_test)

# Evaluation Summary
print("\n" + "="*70)
print("MODEL EVALUATION SUMMARY - Reef Fish Anomaly Detection")
print("="*70)

print("\n[DATASET]")
print(f"  Total Samples: {len(df_reduced)}")
print(f"  Training Samples (85%): {len(df_train)}")
print(f"  Test Samples (15%): {len(df_test)}")
print(f"  Features Used: {len(top_species)} species (top 50 by prevalence)")
print(f"  Total Species in Dataset: {df_T.shape[1]}")

print("\n[ISOLATION FOREST CONFIGURATION]")
print(f"  Contamination Rate: 0.1 (10% expected anomalies)")
print(f"  Number of Trees: 100")
print(f"  Max Samples: {IF.max_samples_} (auto-tuned per tree)")

print("\n[TEST SET RESULTS]")
n_normal = (test_predictions == 1).sum()
n_anomalies = (test_predictions == -1).sum()
print(f"  Normal Samples: {n_normal} ({100*n_normal/len(test_predictions):.1f}%)")
print(f"  Anomalies Detected: {n_anomalies} ({100*n_anomalies/len(test_predictions):.1f}%)")

print("\n[ANOMALY SCORE STATISTICS]")
normal_scores = test_scores[test_predictions == 1]
anomaly_scores = test_scores[test_predictions == -1]

print(f"  Overall Mean Score: {test_scores.mean():.4f}")
print(f"  Overall Std Dev: {test_scores.std():.4f}")
print(f"  Score Range: [{test_scores.min():.4f}, {test_scores.max():.4f}]")

print(f"\n  Normal Samples:")
print(f"    Mean Score: {normal_scores.mean():.4f}")
print(f"    Std Dev: {normal_scores.std():.4f}")
print(f"    Range: [{normal_scores.min():.4f}, {normal_scores.max():.4f}]")

if len(anomaly_scores) > 0:
    print(f"\n  Anomalies:")
    print(f"    Mean Score: {anomaly_scores.mean():.4f}")
    print(f"    Std Dev: {anomaly_scores.std():.4f}")
    print(f"    Range: [{anomaly_scores.min():.4f}, {anomaly_scores.max():.4f}]")
    print(f"    Score Separation: {normal_scores.mean() - anomaly_scores.mean():.4f} (negative = good)")
else:
    print(f"\n  Anomalies: None detected")

print("\n[TOP ANOMALOUS SAMPLES]")
if len(anomaly_scores) > 0:
    anomaly_indices = test_scores.argsort()[:3]
    for i, idx in enumerate(anomaly_indices, 1):
        print(f"  {i}. Index {idx} - Score: {test_scores[idx]:.4f}")
        top_species_in_sample = df_test.iloc[idx].sort_values(ascending=False).head(5)
        for sp, count in top_species_in_sample.items():
            print(f"     {sp}: {int(count)}")
else:
    print("  No anomalies detected")

print("\n[DETECTED ANOMALIES DETAILS]")
if len(anomaly_scores) > 0:
    anomaly_df = pd.DataFrame({
        'Index': test_scores.argsort()[:n_anomalies],
        'Score': test_scores[test_predictions == -1]
    }).sort_values('Score')
    print(anomaly_df.to_string(index=False))
else:
    print("  None")

print("\n[MODEL QUALITY ASSESSMENT]")
score_separation = abs(normal_scores.mean() - anomaly_scores.mean()) if len(anomaly_scores) > 0 else 0
if score_separation > 0.05:
    print("  ✓ Good: Clear separation between normal and anomalous scores")
elif len(anomaly_scores) == 0:
    print("  ✓ All samples appear normal - baseline is clean")
else:
    print("  ⚠ Weak separation between normal and anomalous scores")

print("\n[TOP DISCRIMINATIVE SPECIES]")
# Calculate feature importance using mean values in anomalies vs normal
if len(anomaly_scores) > 0:
    anomaly_means = df_test[test_predictions == -1].mean()
    normal_means = df_test[test_predictions == 1].mean()
    feature_diff = (anomaly_means - normal_means).abs().sort_values(ascending=False)
    print("  Top 5 species with largest differences:")
    for sp, diff in feature_diff.head(5).items():
        print(f"    {sp}: {diff:.2f} (anom: {anomaly_means[sp]:.2f}, norm: {normal_means[sp]:.2f})")
else:
    print("  N/A - No anomalies detected")

print("\n" + "="*70)

# Create visualizations
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1. Score distribution
axes[0, 0].hist(normal_scores, bins=10, alpha=0.7, label='Normal', color='green', edgecolor='black')
if len(anomaly_scores) > 0:
    axes[0, 0].hist(anomaly_scores, bins=5, alpha=0.7, label='Anomaly', color='red', edgecolor='black')
axes[0, 0].set_xlabel('Anomaly Score')
axes[0, 0].set_ylabel('Frequency')
axes[0, 0].set_title('Anomaly Score Distribution')
axes[0, 0].legend()
axes[0, 0].grid(alpha=0.3)

# 2. Box plot
if len(anomaly_scores) > 0:
    bp = axes[0, 1].boxplot([normal_scores, anomaly_scores], labels=['Normal', 'Anomaly'], patch_artist=True)
    for patch, color in zip(bp['boxes'], ['green', 'red']):
        patch.set_facecolor(color)
        patch.set_alpha(0.7)
else:
    axes[0, 1].boxplot([normal_scores], labels=['Normal'], patch_artist=True)
axes[0, 1].set_ylabel('Score')
axes[0, 1].set_title('Score Comparison')
axes[0, 1].grid(alpha=0.3, axis='y')

# 3. Detection rate
categories = ['Normal', 'Anomalies']
counts = [n_normal, n_anomalies]
colors = ['green', 'red']
axes[1, 0].bar(categories, counts, color=colors, alpha=0.7, edgecolor='black')
axes[1, 0].set_ylabel('Count')
axes[1, 0].set_title('Test Set Classification')
axes[1, 0].grid(alpha=0.3, axis='y')
for i, (cat, count) in enumerate(zip(categories, counts)):
    axes[1, 0].text(i, count + 0.5, str(count), ha='center', va='bottom', fontweight='bold')

# 4. Score statistics
stats_text = f"""Model Performance Summary:

Training Samples: {len(df_train)}
Test Samples: {len(df_test)}
Features: {len(top_species)} species

Normal Mean Score: {normal_scores.mean():.4f}
Anomaly Mean Score: {anomaly_scores.mean():.4f} (if any)

Detection Rate: {100*n_anomalies/len(test_predictions):.1f}%
Expected Rate: 10%

Score Separation: {score_separation:.4f}
{'✓ Good' if score_separation > 0.05 else '✓ Normal' if len(anomaly_scores) == 0 else '⚠ Weak'}
"""

axes[1, 1].text(0.1, 0.5, stats_text, fontsize=11, family='monospace',
                verticalalignment='center', bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.3))
axes[1, 1].axis('off')

plt.tight_layout()
plt.savefig('model_evaluation.png', dpi=150, bbox_inches='tight')
print("Visualization saved to: model_evaluation.png")
