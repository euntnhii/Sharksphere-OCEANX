//control narration playback (play audio, notify when dialogue finishes)

import { narrationAudio } from "./narrationAudio";

let currentAudio: HTMLAudioElement | null = null;

export function playDialogue(
    id: keyof typeof narrationAudio,
    onFinished: () => void
) {
    // Stop any narration that's currently playing
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    const source = narrationAudio[id];

    if (!source) {
        console.error(`No narration audio found for ${id}`);
        onFinished();
        return;
    }

    currentAudio = new Audio(source);

    currentAudio.onended = () => {
        setTimeout(() => {
            onFinished();
        }, 200);
    };

    currentAudio.play().catch(error => {
        console.error(error);
        //onFinished();
    });

    return currentAudio;
}