//combine slider input, population calculation, and ecosystem state

import type { EcosystemState } from "../types/ecosystemState";
import { calculateEcosystemState } from "./populationModel";

export function updateSimulation(sharkPopulation: number): EcosystemState {
    const newEcosystemState = calculateEcosystemState(sharkPopulation);
    return newEcosystemState;
};