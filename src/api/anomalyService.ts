//send ecosystem state and receive anomaly percentage

import type { AnomalyResult } from "../types/ecosystemState";

export async function getAnomalyResult(ecosystemState: any): Promise<AnomalyResult> {

    const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Apex_Predators: ecosystemState.populations.apexPredator,
            Herbivore_Scrapers: ecosystemState.populations.herbivoreScraper,
            Turf_Brushers: ecosystemState.populations.turfBrusher,
            Invertebrate_Prey_Hunters: ecosystemState.populations.invertebrateHunter,
            Small_Invertebrates: ecosystemState.populations.smallInvertebrate,
        }),
    });

    const result = await response.json();
    console.log(result);

    return result;
}
