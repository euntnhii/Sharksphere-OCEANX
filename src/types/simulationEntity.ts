//structure of simulation entities with properties for ecosystem behavior and movement

type SharedProperties = {
    id: string;
    x: number;
    y: number;
    species: string;
};

type DirectionVector = {
    x: number;
    y: number;
};

type MovementProperties = {
    direction: DirectionVector;
    velocity: number;
    targetVelocity: number;
    speedTimer: number;
    directionTimer: number;
    facing: "left" | "right";
};

type AnimationProperties = {
    frameIndex: number;
    frameTimer: number;
};

export type SpeciesRole = "apexPredator" | "turfBrusher" | "herbScraper" | "invertHunter" | "smallInvert";

export type EnvironmentRole = "reefBuilder";

type CoralProperties = {
    role: EnvironmentRole;
    layer: "front" | "back";
    variation: 0 | 1 | 2;
};

export type FishEntity =
    SharedProperties & MovementProperties &
    { role: SpeciesRole } & AnimationProperties;

export type SharkEntity =
    SharedProperties & MovementProperties &
    { role: SpeciesRole } & AnimationProperties;

export type CoralEntity = Omit<SharedProperties, "species"> & { species: "branching" | "massive" | "plate" } & CoralProperties;

export type EcosystemEntities = {
    sharks: SharkEntity[];
    fishes: FishEntity[];
    corals: CoralEntity[];
};
