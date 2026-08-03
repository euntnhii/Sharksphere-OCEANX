import type { AddNarrationZone } from "./addNarration";

export async function playZoneNarration(
    zone: AddNarrationZone,
    callbacks: {
        onStart: () => void;
        onFinish: () => void;
        onText: (text: string) => void;
    }
): Promise<void> {

    callbacks.onStart();

    for (const part of zone.narration) {

        callbacks.onText(part.text);

        await playAudio(part.audio);

        await delay(600);

    }

    callbacks.onFinish();
}

function playAudio(src: string): Promise<void> {

    return new Promise((resolve) => {

        const audio = new Audio(src);

        audio.onended = () => resolve();
        audio.onerror = () => resolve();

        audio.play().catch(() => resolve());

    });

}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}