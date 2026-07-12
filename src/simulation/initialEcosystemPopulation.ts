//store the initial ecosystem populations (healthy ecosystem) when simulation starts

import type { AnomalyResult } from "../types/ecosystemState";
import { calculateEcosystemState } from "./populationModel";

export const initialEcosystemState = calculateEcosystemState(6);

export const initialAnomalyResult: AnomalyResult = {
    anomalyPercentage: 0
};