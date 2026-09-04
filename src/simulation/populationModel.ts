//calculate ecosystem changes based on shark population

import type { EcosystemState } from "../types/ecosystemState";

function calculateTurfBrusherPop(sharkPopulation: number): number {
    const result = 5.687 + (26.094 * Math.exp(-0.143 * sharkPopulation));
    return result;
};

function calculateHerbivoreScraperPop(sharkPopulation: number): number {
    const result = 4.718 + (51.903 * Math.exp(-0.169 * sharkPopulation));
    return result;
};

function calculateInvertebratePreyHunterPop(sharkPopulation: number): number {
    const result = 2.261 + (20.348 * Math.exp(-0.155 * sharkPopulation));
    return result;
};

function calculateSmallInvertebratePop(invertebratePreyHunterPop: number): number {
    const result = 25.693 + (51.385 * Math.exp(-0.067 * invertebratePreyHunterPop));
    return result;
};

function calculateAlgaeLevel(turfBrusherPop: number, herbivoreScraperPop: number, smallInvertebratePop: number): number {
    const grazingPressure = (0.5 * turfBrusherPop) + (1 * herbivoreScraperPop) + (0.15 * smallInvertebratePop);
    const result = 10 + (90 / (1 + 0.085 * grazingPressure));
    return result;
};

function calculateCoralHealth(algaeLevel: number): number {
    if (algaeLevel > 31) {
        const result = 100 / (1 + Math.exp(0.13 * (algaeLevel - 60)));
        return result;
    } else {
        const result = 100 - 0.0355 * ((30.568 - algaeLevel) ** 2);
        return result;
    };
};

//display coral health (more dramatic difference)
function calculateDisplayCoralHealth(actualHealth: number): number {
    const damage = 100 - actualHealth;
    const amplifiedDamage = damage * 12;
    return Math.max(10, 100 - amplifiedDamage);
};

export function calculateEcosystemState(sharkPopulation: number): EcosystemState {
    const turfBrusherPop = calculateTurfBrusherPop(sharkPopulation);
    const herbivoreScraperPop = calculateHerbivoreScraperPop(sharkPopulation);
    const invertebratePreyHunterPop = calculateInvertebratePreyHunterPop(sharkPopulation);
    const smallInvertebratePop = calculateSmallInvertebratePop(invertebratePreyHunterPop);
    const algaeLevel = calculateAlgaeLevel(turfBrusherPop, herbivoreScraperPop, smallInvertebratePop);
    const actualCoralHealth = calculateCoralHealth(algaeLevel);
    const coralHealth = calculateDisplayCoralHealth(actualCoralHealth);

    return {
        populations: {
            apexPredator: sharkPopulation,
            invertebrateHunter: invertebratePreyHunterPop,
            smallInvertebrate: smallInvertebratePop,
            herbivoreScraper: herbivoreScraperPop,
            turfBrusher: turfBrusherPop
        },
        coralHealth: coralHealth
    };
};