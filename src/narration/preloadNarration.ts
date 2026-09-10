import { narrationAudio } from "./narrationAudio";
import { addNarration } from "./addNarration";

export async function preloadNarrationAudio() {
    const sources = [
        ...Object.values(narrationAudio),

        ...Object.values(addNarration)
            .flat()
            .map((part) => part.audio),
    ];

    const uniqueSources = [...new Set(sources)];

    await Promise.all(
        uniqueSources.map((src) => {
            return new Promise<void>((resolve) => {
                const audio = new Audio();

                audio.preload = "auto";

                audio.oncanplaythrough = () => {
                    resolve();
                };

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