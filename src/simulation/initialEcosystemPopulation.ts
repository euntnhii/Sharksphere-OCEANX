//store the initial ecosystem populations (healthy ecosystem) when simulation starts

import type { AnomalyResult } from "../types/ecosystemState";
import { calculateEcosystemState } from "./populationModel";

export const initialEcosystemState = calculateEcosystemState(6);

export const initialAnomalyResult: AnomalyResult = {
    prediction: 1,
    anomaly_score: 0,
    anomaly_percentage: 0,
    diffi_scores: {
        Apex_Predators: 0,
        Herbivore_Scrapers: 0,
        Turf_Brushers: 0,
        Invertebrate_Prey_Hunters: 0,
        Small_Invertebrates: 0,
    },
};