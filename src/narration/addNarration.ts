import shark0_1 from "../assets/audio/narration/additional/shark0-1-audio.mp3";
import shark0_2 from "../assets/audio/narration/additional/shark0-2-audio.mp3";
import shark0_3 from "../assets/audio/narration/additional/shark0-3-audio.mp3";
import shark0_4 from "../assets/audio/narration/additional/shark0-4-audio.mp3";

import shark1_1 from "../assets/audio/narration/additional/shark1-1-audio.mp3";
import shark1_2 from "../assets/audio/narration/additional/shark1-2-audio.mp3";
import shark1_3 from "../assets/audio/narration/additional/shark1-3-audio.mp3";
import shark1_4 from "../assets/audio/narration/additional/shark1-4-audio.mp3";

import shark2_1 from "../assets/audio/narration/additional/shark2-1-audio.mp3";
import shark2_2 from "../assets/audio/narration/additional/shark2-2-audio.mp3";
import shark2_3 from "../assets/audio/narration/additional/shark2-3-audio.mp3";
import shark2_4 from "../assets/audio/narration/additional/shark2-4-audio.mp3";

import shark3_1 from "../assets/audio/narration/additional/shark3-1-audio.mp3";
import shark3_2 from "../assets/audio/narration/additional/shark3-2-audio.mp3";
import shark3_3 from "../assets/audio/narration/additional/shark3-3-audio.mp3";
import shark3_4 from "../assets/audio/narration/additional/shark3-4-audio.mp3";

import shark4_1 from "../assets/audio/narration/additional/shark4-1-audio.mp3";
import shark4_2 from "../assets/audio/narration/additional/shark4-2-audio.mp3";
import shark4_3 from "../assets/audio/narration/additional/shark4-3-audio.mp3";
import shark4_4 from "../assets/audio/narration/additional/shark4-4-audio.mp3";

import shark5_1 from "../assets/audio/narration/additional/shark5-1-audio.mp3";
import shark5_2 from "../assets/audio/narration/additional/shark5-2-audio.mp3";
import shark5_3 from "../assets/audio/narration/additional/shark5-3-audio.mp3";
import shark5_4 from "../assets/audio/narration/additional/shark5-4-audio.mp3";

import shark6_1 from "../assets/audio/narration/additional/shark6-1-audio.mp3";
import shark6_2 from "../assets/audio/narration/additional/shark6-2-audio.mp3";
import shark6_3 from "../assets/audio/narration/additional/shark6-3-audio.mp3";
import shark6_4 from "../assets/audio/narration/additional/shark6-4-audio.mp3";

import end1 from "../assets/audio/narration/additional/end1-audio.mp3";
import end2 from "../assets/audio/narration/additional/end2-audio.mp3";

export type AddNarrationPart = {
    text: string;
    audio: string;
};


export const addNarration: Record<number, AddNarrationPart[]> = {

    0: [
        {
            text: "Oh no, there are no sharks left in the reef!",
            audio: shark0_1
        },
        {
            text: "Without apex predators, predation is severely reduced.",
            audio: shark0_2
        },
        {
            text: "Prey populations can grow unchecked, causing disruptions to ecosystem balance.",
            audio: shark0_3
        },
        {
            text: "What does the anomaly score tell us about the current ecosystem balance?",
            audio: shark0_4
        }
    ],

    1: [
        {
            text: "There is only one shark left in the reef!",
            audio: shark1_1
        },
        {
            text: "With so few apex predators, predation is greatly reduced.",
            audio: shark1_2
        },
        {
            text: "This may cause prey populations to increase drastically, leading to ecosystem imbalance.",
            audio: shark1_3
        },
        {
            text: "Click on any of the species to find out how they are affected!",
            audio: shark1_4
        }
    ],

    2: [
        {
            text: "The reef now has 2 sharks!",
            audio: shark2_1
        },
        {
            text: "With so few apex predators, predation remains below an adequate level.",
            audio: shark2_2
        },
        {
            text: "Prey populations may become too large, causing the ecosystem to become imbalanced.",
            audio: shark2_3
        },
        {
            text: "How do you think a larger shark population would affect the ecosystem?",
            audio: shark2_4
        }
    ],

    3: [
        {
            text: "There are 3 sharks in the reef now!",
            audio: shark3_1
        },
        {
            text: "Predation helps regulate prey, but it is still below an adequate level.",
            audio: shark3_2
        },
        {
            text: "This may cause the ecosystem to gradually become imbalanced.",
            audio: shark3_3
        },
        {
            text: "Click on each species to see how they are affected!",
            audio: shark3_4
        }
    ],

    4: [
        {
            text: "There are 4 sharks in the reef!",
            audio: shark4_1
        },
        {
            text: "Prey populations are now more regulated compared to at lower shark levels.",
            audio: shark4_2
        },
        {
            text: "This supports a more balanced food web, contributing to ecosystem balance.",
            audio: shark4_3
        },
        {
            text: "How do you think the anomaly score would differ if there were less sharks?",
            audio: shark4_4
        }
    ],

    5: [
        {
            text: "There are 5 sharks in the reef!",
            audio: shark5_1
        },
        {
            text: "Predation is now near the adequate level, helping to keep prey populations well regulated.",
            audio: shark5_2
        },
        {
            text: "This supports a more balanced food web, leading to a more balanced ecosystem.",
            audio: shark5_3
        },
        {
            text: "Click on any of the species to see how they are doing now!",
            audio: shark5_4
        }
    ],

    6: [
        {
            text: "There are 6 sharks in the reef now!",
            audio: shark6_1
        },
        {
            text: "An adequate apex predator population ensures sufficient predation is maintained.",
            audio: shark6_2
        },
        {
            text: "This leads to a balanced ecosystem where prey populations are well-regulated.",
            audio: shark6_3
        },
        {
            text: "Take a look at the anomaly score! How do you think it would differ if there were less sharks?",
            audio: shark6_4
        }
    ]
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