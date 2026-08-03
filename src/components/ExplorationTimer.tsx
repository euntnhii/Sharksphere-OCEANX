//display exploration countdown timer and ffwd button after 30 seconds

import { useState, useEffect } from "react";
import "./ExplorationTimer.css";

type ExplorationTimerProps = {
    duration: number;
    unlockAfter: number;
    onFinished: () => void;
};

export function ExplorationTimer({ duration, unlockAfter, onFinished }: ExplorationTimerProps) {

    const [remainingTime, setRemainingTime] = useState(duration);
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const unlockTimeout = setTimeout(() => {
            setIsUnlocked(true);
        }, unlockAfter * 1000);

        return () => clearTimeout(unlockTimeout);
    }, [unlockAfter]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(previous => {

                if (previous <= 1) {
                    clearInterval(interval);
                    onFinished();
                    return 0;
                }

                return previous - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onFinished]);


    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;


    return (
        <div className="exploration-timer">
            <div className="timer-display">
                {formattedTime}
            </div>

            <button disabled={!isUnlocked}>
                I'm done exploring →
            </button>
        </div>
    );
}