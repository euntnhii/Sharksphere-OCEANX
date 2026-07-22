//define configuration for each species

export const speciesConfig = {
    apexPredator: {
        drawWidth: 260,
        drawHeight: 200,
        clickWidth: 150,
        clickHeight: 60,
        baseSpeed: 1.0,
        schooling: {
            enabled: false,
            radius: 0,
            strength: 0
        },
        minY: 20,
        maxY: 180,

        speedVariation: 0.25,
        acceleration: 0.05,
        speedChangeInterval: 240,
    }, //blacktip reef shark

    turfBrusher: {
        drawWidth: 40,
        drawHeight: 32,
        clickWidth: 28,
        clickHeight: 16,
        baseSpeed: 0.28,
        schooling: {
            enabled: true,
            radius: 50,
            strength: 0.015
        },
        minY: 220,
        maxY: 380,

        speedVariation: 0.35,
        acceleration: 0.025,
        speedChangeInterval: 150
    }, //striated surgeonfish

    herbScraper: {
        drawWidth: 60,
        drawHeight: 48,
        clickWidth: 42,
        clickHeight: 22,
        baseSpeed: 0.35,
        schooling: {
            enabled: true,
            radius: 50,
            strength: 0.015
        },
        minY: 320,
        maxY: 430,

        speedVariation: 0.30,
        acceleration: 0.03,
        speedChangeInterval: 170
    }, //bullethead parrotfish

    invertHunter: {
        drawWidth: 53,
        drawHeight: 42,
        clickWidth: 38,
        clickHeight: 18,
        baseSpeed: 0.3,
        schooling: {
            enabled: true,
            radius: 50,
            strength: 0.015
        },
        minY: 430,
        maxY: 476,

        speedVariation: 0.45,
        acceleration: 0.035,
        speedChangeInterval: 140
    }, //manybar goatfish

    smallInvert: {
        drawWidth: 10,
        drawHeight: 8,
        clickWidth: 8,
        clickHeight: 5,
        baseSpeed: 0.08,
        schooling: {
            enabled: false,
            radius: 0,
            strength: 0
        },
        minY: 450,
        maxY: 484,

        speedVariation: 0.60,
        acceleration: 0.015,
        speedChangeInterval: 100
    } //shrimp
} as const;

export const coralConfig = {
    branching: {
        width: 60,
        height: 42,
        clickWidth: 50,
        clickHeight: 35,
    },
    massive: {
        width: 50,
        height: 38,
        clickWidth: 42,
        clickHeight: 30,
    },
    plate: {
        width: 50,
        height: 38,
        clickWidth: 42,
        clickHeight: 30,
    }
};