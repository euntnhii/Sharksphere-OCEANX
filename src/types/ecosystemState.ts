//structure of data representing what is happening in the ecosystem

type SpeciesPopulation = {
    [speciesName: string]: number;
};

export type EcosystemState = {
    populations: SpeciesPopulation;
    coralHealth: number;
};

export type AnomalyResult = {
    prediction: number;
    anomaly_score: number;
    anomaly_percentage: number;
    diffi_scores: Record<string, number>;
};