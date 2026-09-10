import underwater_ambience from "../assets/audio/underwater_ambience.mp3";
import { narrationAudio } from "./narrationAudio";
import { addNarration, endExplorationNarration } from "./addNarration";

export async function preloadNarrationAudio() {
    const sources = [
        // Intro + tutorial
        ...Object.values(narrationAudio),

        // Exploration narration
        ...Object.values(addNarration)
            .flat()
            .map((part) => part.audio),

        // Ending narration
        ...endExplorationNarration.map((part) => part.audio),

        // Background ambience
        underwater_ambience,
    ];

    const uniqueSources = [...new Set(sources)];

    await Promise.all(
        uniqueSources.map((src) => {
            return new Promise<void>((resolve) => {
                const audio = new Audio();

                audio.preload = "auto";

                const finish = () => {
                    audio.oncanplay = null;
                    audio.onerror = null;
                    resolve();
                };

                audio.oncanplay = finish;

                audio.onerror = () => {
                    console.error(`Failed to preload audio: ${src}`);
                    resolve();
                };

                audio.src = src;
                audio.load();
            });
        })
    );
}