//create entities based on population numbers
//give each entity a unique id and its initial position

import type { FishEntity, SharkEntity, SpeciesRole, EcosystemEntities } from "../types/simulationEntity";
import type { EcosystemState } from "../types/ecosystemState";
import { speciesConfig } from "./speciesConfig";

const entityCounter = {
    apexPredator: 0,
    turfBrusher: 0,
    herbScraper: 0,
    invertHunter: 0,
    smallInvert: 0
};

export function createFish(species: string, role: SpeciesRole): FishEntity {
    entityCounter[role] += 1;
    const config = speciesConfig[role];
    return {
        id: `${role}-${entityCounter[role]}`,
        x: Math.random() * 800,
        y: config.minY + Math.random() * (config.maxY - config.minY),
        species: species,
        role: role,
        direction: {
            x: Math.random() * 2 - 1, //random direction between -1 and 1
            y: 0 //random direction between -1 and 1
        },
        velocity: speciesConfig[role].baseSpeed,
        targetVelocity: speciesConfig[role].baseSpeed,
        speedTimer: 0,
        directionTimer: 0,
        facing: "right",
        frameIndex: 0,
        frameTimer: 0
    }
};

export function createShark(): SharkEntity {
    entityCounter.apexPredator += 1;
    const config = speciesConfig.apexPredator;
    return {
        id: `apexPredator-${entityCounter.apexPredator}`,
        x: Math.random() * 800,
        y: config.minY + Math.random() * (config.maxY - config.minY),
        species: "blacktipReefShark",
        role: "apexPredator",
        direction: {
            x: 1,
            y: 0
        },
        velocity: speciesConfig.apexPredator.baseSpeed,
        targetVelocity: speciesConfig.apexPredator.baseSpeed,
        speedTimer: 0,
        directionTimer: 0,
        facing: "right",
        frameIndex: 0,
        frameTimer: 0
    }
};


function resetEntityCounters() {
    entityCounter.apexPredator = 0;
    entityCounter.turfBrusher = 0;
    entityCounter.herbScraper = 0;
    entityCounter.invertHunter = 0;
    entityCounter.smallInvert = 0;
};

export function createEntityArray(ecosystemState: EcosystemState): EcosystemEntities {

    resetEntityCounters();

    //create empty arrays
    const sharks: SharkEntity[] = [];
    const fishes: FishEntity[] = [];

    //get population numbers from ecosystem state
    const numberOfSharks = Math.ceil(ecosystemState.populations.apexPredator);
    const numberOfTurfBrushers = Math.ceil(ecosystemState.populations.turfBrusher);
    const numberOfHerbScrapers = Math.ceil(ecosystemState.populations.herbivoreScraper);
    const numberOfInvertHunters = Math.ceil(ecosystemState.populations.invertebrateHunter);
    const numberOfSmallInverts = Math.ceil(ecosystemState.populations.smallInvertebrate);

    //create sharks based on population
    for (let i = 0; i < numberOfSharks; i++) {
        sharks.push(createShark());
    };

    //create fishes based on population
    for (let i = 0; i < numberOfTurfBrushers; i++) {
        fishes.push(createFish("turfBrusher", "turfBrusher"));
    };

    for (let i = 0; i < numberOfHerbScrapers; i++) {
        fishes.push(createFish("herbScraper", "herbScraper"));
    };

    for (let i = 0; i < numberOfInvertHunters; i++) {
        fishes.push(createFish("invertHunter", "invertHunter"));
    };

    for (let i = 0; i < numberOfSmallInverts; i++) {
        fishes.push(createFish("smallInvert", "smallInvert"));
    };

    //return entity arrays
    return {
        sharks: sharks,
        fishes: fishes,
        corals: []
    } satisfies EcosystemEntities;
};