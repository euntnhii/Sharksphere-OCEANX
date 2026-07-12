//ecological interpretation of each species based on current ecosystem state

import type { EcoStatus, Status } from "../types/ecoStatus";
import type { EcosystemState } from "../types/ecosystemState";
import { calculateEcosystemState } from "./populationModel";


type SimulationEffects = {
    ecoStatus: Status;
}


function getSharkStatus(ecosystemState: EcosystemState): SimulationEffects {
    const population = ecosystemState.populations.apexPredator;

    if (population <= 2) {
        return {
            ecoStatus: "Endangered",
        }
    };
    if (population <= 4) {
        return {
            ecoStatus: "Declining",
        }
    };
    if (population <= 6) {
        return {
            ecoStatus: "Optimal",
        }
    };
    if (population <= 7) {
        return {
            ecoStatus: "Stable",
        }
    };
    if (population <= 9) {
        return {
            ecoStatus: "Slightly Elevated",
        }
    };
    if (population <= 11) {
        return {
            ecoStatus: "Elevated",
        }
    };
    if (population <= 14) {
        return {
            ecoStatus: "Overpopulated",
        }
    };
    return {
        ecoStatus: "Overpopulated",
    }
};


const equilibriumState = calculateEcosystemState(6);
const equilibriumPopulations = equilibriumState.populations;

function getSpeciesStatus(population: number, equilibrium: number): EcoStatus {
    const deviation = (population - equilibrium) / equilibrium; //deviation from equilibrium population

    if (deviation >= 0.40) return "Overpopulated";
    if (deviation >= 0.20) return "Elevated";
    if (deviation >= 0.10) return "Slightly Elevated";
    if (Math.abs(deviation) < 0.10) return "Optimal";
    if (deviation >= -0.20) return "Stable";
    if (deviation >= -0.40) return "Declining";
    return "Endangered";
};

function getSurgeonfishStatus(ecosystemState: EcosystemState): SimulationEffects {
    const population = ecosystemState.populations.turfBrusher;

    return {
        ecoStatus: getSpeciesStatus(population, equilibriumPopulations.turfBrusher),
    };
};

function getParrotfishStatus(ecosystemState: EcosystemState): SimulationEffects {
    const population = ecosystemState.populations.herbivoreScraper;

    return {
        ecoStatus: getSpeciesStatus(population, equilibriumPopulations.herbivoreScraper),
    };
};

function getGoatfishStatus(ecosystemState: EcosystemState): SimulationEffects {
    const population = ecosystemState.populations.invertebrateHunter;

    return {
        ecoStatus: getSpeciesStatus(population, equilibriumPopulations.invertebrateHunter),
    };
};

function getCleanerShrimpStatus(ecosystemState: EcosystemState): SimulationEffects {
    const population = ecosystemState.populations.smallInvertebrate;

    return {
        ecoStatus: getSpeciesStatus(population, equilibriumPopulations.smallInvertebrate),
    };
};

function getReefBuilderStatus(ecosystemState: EcosystemState): SimulationEffects {
    const coralHealth = ecosystemState.coralHealth;

    if (coralHealth >= 85) {
        return {
            ecoStatus: "Optimal",
        }
    };
    if (coralHealth >= 60) {
        return {
            ecoStatus: "Stable",
        }
    };
    if (coralHealth >= 50) {
        return {
            ecoStatus: "Slightly Declining",
        }
    };
    if (coralHealth >= 30) {
        return {
            ecoStatus: "Declining",
        }
    };
    return {
        ecoStatus: "Endangered",
    };
};


export function getEcoStatus(species: string, ecosystemState: EcosystemState): SimulationEffects {

    switch (species) {
        case "Blacktip Reef Shark":
            return getSharkStatus(ecosystemState);
        case "Striated Surgeonfish":
            return getSurgeonfishStatus(ecosystemState);
        case "Bullethead Parrotfish":
            return getParrotfishStatus(ecosystemState);
        case "Manybar Goatfish":
            return getGoatfishStatus(ecosystemState);
        case "Cleaner Shrimp":
            return getCleanerShrimpStatus(ecosystemState);
        case "Reef Builder":
            return getReefBuilderStatus(ecosystemState);
        default:
            throw new Error(`Unknown species: ${species}`);
    };
};

export function getStatusColorClass(status: string): string {
    switch (status) {
        case "Optimal":
        case "Stable":
        case "Slightly Elevated":
            return "status-green";

        case "Slightly Declining":
        case "Declining":
        case "Elevated":
            return "status-yellow";

        case "Endangered":
        case "Overpopulated":
            return "status-red";

        default:
            return "status-green";
    }
};