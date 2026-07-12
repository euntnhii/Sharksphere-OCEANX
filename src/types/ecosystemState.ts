//structure of data representing what is happening in the ecosystem

type SpeciesPopulation = {
    [speciesName: string]: number;
};

export type EcosystemState = {
    populations: SpeciesPopulation;
    coralHealth: number;
};

export type AnomalyResult = {
    anomalyPercentage: number;
};