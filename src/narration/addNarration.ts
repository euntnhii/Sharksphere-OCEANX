//store narration for each shark zone
import endangered1 from "../assets/audio/narration/additional/endangered1-audio.mp3";
import declining1 from "../assets/audio/narration/additional/declining1-audio.mp3";
import optimal1 from "../assets/audio/narration/additional/optimal1-audio.mp3";
import slightlyElevated1 from "../assets/audio/narration/additional/slightlyElevated1-audio.mp3";
import elevated1 from "../assets/audio/narration/additional/elevated1-audio.mp3";
import overpopulated1 from "../assets/audio/narration/additional/overpopulated1-audio.mp3";
import endangered2 from "../assets/audio/narration/additional/endangered2-audio.mp3";
import declining2 from "../assets/audio/narration/additional/declining2-audio.mp3";
import optimal2 from "../assets/audio/narration/additional/optimal2-audio.mp3";
import slightlyElevated2 from "../assets/audio/narration/additional/slightlyElevated2-audio.mp3";
import elevated2 from "../assets/audio/narration/additional/elevated2-audio.mp3";
import overpopulated2 from "../assets/audio/narration/additional/overpopulated2-audio.mp3";
import endangered3 from "../assets/audio/narration/additional/endangered3-audio.mp3";
import declining3 from "../assets/audio/narration/additional/declining3-audio.mp3";
import optimal3 from "../assets/audio/narration/additional/optimal3-audio.mp3";
import slightlyElevated3 from "../assets/audio/narration/additional/slightlyElevated3-audio.mp3";
import elevated3 from "../assets/audio/narration/additional/elevated3-audio.mp3";
import overpopulated3 from "../assets/audio/narration/additional/overpopulated3-audio.mp3";
import endangered4 from "../assets/audio/narration/additional/endangered4-audio.mp3";
import slightlyElevated4 from "../assets/audio/narration/additional/slightlyElevated4-audio.mp3";
import elevated4 from "../assets/audio/narration/additional/elevated4-audio.mp3";
import overpopulated4 from "../assets/audio/narration/additional/overpopulated4-audio.mp3";
import end1 from "../assets/audio/narration/additional/end1-audio.mp3";
import end2 from "../assets/audio/narration/additional/end2-audio.mp3";

export type SharkZone = "endangered" | "declining" | "optimal" | "slightlyElevated" | "elevated" | "overpopulated";

export type AddNarrationPart = {
    text: string;
    audio: string;
};

export type AddNarrationZone = {
    zone: SharkZone;
    narration: AddNarrationPart[];
}

export const addNarration: Record<SharkZone, AddNarrationZone> = {

    endangered: {
        zone: "endangered",
        narration: [
            { text: "Woah, there are almost no sharks left in the reef!", audio: endangered1 },
            { text: "Apex predators play an important role, so this situation is quite unusual.", audio: endangered2 },
            { text: "Take a look at the anomaly score, do you think it suggests that the ecosystem is healthy?", audio: endangered3 },
            { text: "Try clicking on the species to find out who is being affected the most!", audio: endangered4 }
        ]
    },

    declining: {
        zone: "declining",
        narration: [
            { text: "The shark population is declining!", audio: declining1 },
            { text: "Compare the different fish populations, can you spot which groups are increasing and which are decreasing?", audio: declining2 },
            { text: "Click on any species to learn why that might be happening!", audio: declining3 }
        ]
    },

    optimal: {
        zone: "optimal",
        narration: [
            { text: "This looks like a healthy shark population!", audio: optimal1 },
            { text: "Marine ecosystems are often most stable when predator and prey populations are balanced.", audio: optimal2 },
            { text: "Take a look at the anomaly score, how do you think it would compare with if there were fewer sharks?", audio: optimal3 }
        ]
    },

    slightlyElevated: {
        zone: "slightlyElevated",
        narration: [
            { text: "There are more sharks than usual now!", audio: slightlyElevated1 },
            { text: "Increased predation can cause the population of other reef animals to change.", audio: slightlyElevated2 },
            { text: "Take a look at the ecosystem, how do you think the fish populations changed?", audio: slightlyElevated3 },
            { text: "Click on each species to understand their role in the food web!", audio: slightlyElevated4 }
        ]
    },

    elevated: {
        zone: "elevated",
        narration: [
            { text: "Wow, there are a lot of sharks!", audio: elevated1 },
            { text: "Predators are now placing more pressure on the ecosystem.", audio: elevated2 },
            { text: "Look closely at the other fishes, how has their population size changed?", audio: elevated3 },
            { text: "Has the anomaly score changed as well?", audio: elevated4 }
        ]
    },

    overpopulated: {
        zone: "overpopulated",
        narration: [
            { text: "Oh no, the reef now has an unusually high number of sharks!", audio: overpopulated1 },
            { text: "Apex predators can become a problem when their populations grow too large.", audio: overpopulated2 },
            { text: "Take a look at the ecosystem, which species seem to be struggling?", audio: overpopulated3 },
            { text: "What does the anomaly score tell you about the overall balance of the reef?", audio: overpopulated4 }
        ]
    }
};

export function getExplorationZone(sharkPopulation: number): SharkZone {
    if (sharkPopulation <= 2) {
        return "endangered";
    }
    if (sharkPopulation <= 4) {
        return "declining";
    }
    if (sharkPopulation <= 7) {
        return "optimal";
    }
    if (sharkPopulation <= 9) {
        return "slightlyElevated";
    }
    if (sharkPopulation <= 11) {
        return "elevated";
    }
    return "overpopulated";
};


export const endExplorationNarration = [
    {
        text: "Oh, time is up!",
        audio: end1
    },
    {
        text: "Thank you, fellow scientist, for exploring the ecosystem together with me!",
        audio: end2
    }
];