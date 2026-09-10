import { narrationAudio } from "./narrationAudio";

let currentAudio: HTMLAudioElement | null = null;
let playbackId = 0;

export function playDialogue(
    id: keyof typeof narrationAudio,
    onFinished: () => void
) {
    // Invalidate any previous narration
    playbackId++;
    const thisPlaybackId = playbackId;

    // Stop previous audio completely
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio.onended = null;
        currentAudio.onerror = null;
        currentAudio = null;
    }

    const source = narrationAudio[id];

    if (!source) {
        console.error(`No narration audio found for ${id}`);
        onFinished();
        return;
    }

    const audio = new Audio(source);
    audio.preload = "auto";
    currentAudio = audio;

    audio.onended = () => {
        // Ignore callbacks from old audio
        if (thisPlaybackId !== playbackId) {
            return;
        }

        currentAudio = null;

        setTimeout(() => {
            // Check again in case another narration started
            if (thisPlaybackId !== playbackId) {
                return;
            }

            onFinished();
        }, 200);
    };

    audio.onerror = () => {
        // Ignore errors from old audio
        if (thisPlaybackId !== playbackId) {
            return;
        }

        currentAudio = null;
        onFinished();
    };

    audio.play().catch(error => {
        // Ignore errors caused by intentionally stopping the audio
        if (thisPlaybackId !== playbackId) {
            return;
        }

        if (error.name !== "AbortError") {
            console.error(error);
        }

        currentAudio = null;
        onFinished();
    });

    return audio;
}

export function stopDialogue() {
    // Invalidate the current narration
    playbackId++;

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;

        currentAudio.onended = null;
        currentAudio.onerror = null;

        currentAudio = null;
    }
}