//simulate anomaly model response

import type { EcosystemState, AnomalyResult } from "../types/ecosystemState";

export function generateMockAnomaly(ecosystemState: EcosystemState): AnomalyResult {
    const coralHealth = ecosystemState.coralHealth;
    const anomalyPercentage = 100 - coralHealth;
    return { anomalyPercentage };
};