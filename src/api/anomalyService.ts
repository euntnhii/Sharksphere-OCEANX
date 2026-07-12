//send ecosystem state and receive anomaly percentage

import type { EcosystemState, AnomalyResult } from "../types/ecosystemState";
import { generateMockAnomaly } from "./mockAnomaly";

export function getAnomalyResult(ecosystemState: EcosystemState): AnomalyResult {
    const anomalyResult = generateMockAnomaly(ecosystemState);
    return anomalyResult;
};