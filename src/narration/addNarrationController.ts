import type { AddNarrationPart } from "./addNarration";

export function playNarration(
    narration: AddNarrationPart[],
    callbacks: {
        onStart: () => void;
        onFinish: () => void;
        onText: (text: string) => void;
    }
) {
    let cancelled = false;
    let currentAudio: HTMLAudioElement | null = null;
    let currentTimeout: number | null = null;

    // Used to immediately interrupt whatever the controller
    // is currently waiting for.
    let resolveCurrentWait: (() => void) | null = null;

    // Tells the loop that the current part was skipped,
    // so it should NOT wait the normal 600ms delay.
    let skipRequested = false;

    callbacks.onStart();

    const promise = (async () => {
        for (const part of narration) {
            if (cancelled) {
                return;
            }

            // Reset skip state for this narration part
            skipRequested = false;

            // Display the new speech bubble immediately
            callbacks.onText(part.text);

            // Wait for audio to finish
            await new Promise<void>((resolve) => {
                resolveCurrentWait = resolve;

                const audio = new Audio(part.audio);
                currentAudio = audio;

                const cleanup = () => {
                    if (currentAudio === audio) {
                        currentAudio = null;
                    }

                    if (resolveCurrentWait === resolve) {
                        resolveCurrentWait = null;
                    }
                };

                audio.onended = () => {
                    cleanup();
                    resolve();
                };

                audio.onerror = () => {
                    cleanup();
                    resolve();
                };

                audio.play().catch(() => {
                    cleanup();
                    resolve();
                });
            });

            if (cancelled) {
                return;
            }

            // If the user clicked Skip, immediately continue
            // to the next narration part.
            if (skipRequested) {
                continue;
            }

            // Normal narration waits 600ms before showing
            // the next speech bubble.
            await new Promise<void>((resolve) => {
                resolveCurrentWait = resolve;

                currentTimeout = window.setTimeout(() => {
                    currentTimeout = null;

                    if (resolveCurrentWait === resolve) {
                        resolveCurrentWait = null;
                    }

                    resolve();
                }, 600);
            });

            if (cancelled) {
                return;
            }
        }

        // All narration parts completed
        if (!cancelled) {
            callbacks.onFinish();
        }
    })();

    return {
        promise,

        skip() {
            if (cancelled) {
                return;
            }

            // Tell the loop this part was skipped.
            skipRequested = true;

            // Cancel the 600ms delay if one is active.
            if (currentTimeout !== null) {
                clearTimeout(currentTimeout);
                currentTimeout = null;
            }

            // Stop the current audio immediately.
            if (currentAudio) {
                const audio = currentAudio;

                currentAudio = null;

                audio.pause();
                audio.currentTime = 0;

                audio.onended = null;
                audio.onerror = null;
            }

            // Release whichever Promise the controller
            // is currently waiting on.
            if (resolveCurrentWait) {
                const resolve = resolveCurrentWait;
                resolveCurrentWait = null;
                resolve();
            }
        },

        cancel() {
            cancelled = true;

            // Stop the current audio.
            if (currentAudio) {
                const audio = currentAudio;

                currentAudio = null;

                audio.pause();
                audio.currentTime = 0;

                audio.onended = null;
                audio.onerror = null;
            }

            // Cancel any delay.
            if (currentTimeout !== null) {
                clearTimeout(currentTimeout);
                currentTimeout = null;
            }

            // Release the current Promise so the async
            // function can terminate.
            if (resolveCurrentWait) {
                const resolve = resolveCurrentWait;
                resolveCurrentWait = null;
                resolve();
            }
        }
    };
}