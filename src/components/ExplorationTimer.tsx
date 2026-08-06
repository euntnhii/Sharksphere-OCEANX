//display exploration countdown timer and ffwd button after 30 seconds

import { useState, useEffect, useRef } from "react";
import "./ExplorationTimer.css";

type ExplorationTimerProps = {
    duration: number;
    unlockAfter: number;
    onFinished: () => void;
};

export function ExplorationTimer({ duration, unlockAfter, onFinished }: ExplorationTimerProps) {

    const [remainingTime, setRemainingTime] = useState(duration);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const hasFinished = useRef(false);

    //unlock button after the specified time
    useEffect(() => {
        if (hasFinished.current) return;

        const unlockTimeout = setTimeout(() => {
            setIsUnlocked(true);
        }, unlockAfter * 1000);

        return () => clearTimeout(unlockTimeout);
    }, [unlockAfter]);


    //call onFinished when the timer reaches 0
    useEffect(() => {
        if (remainingTime === 0 && !hasFinished.current) {
            hasFinished.current = true;
            onFinished();
        }
    }, [remainingTime, onFinished]);


    //countdown timer effect
    useEffect(() => {
        if (hasFinished.current || remainingTime === 0) return;

        const interval = setInterval(() => {
            setRemainingTime(time => Math.max(time - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTime]);


    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;


    return (
        <div className="exploration-timer">
            <div className="timer-display">
                {formattedTime}
            </div>

            <button className="done-button" disabled={!isUnlocked} onClick={() => setShowConfirmation(true)}>
                I'm done exploring →
            </button>

            {showConfirmation && (
                <div className="confirmation-overlay">
                    <div className="confirmation-box">

                        <p>
                            Are you sure you want to leave the simulation page?
                        </p>

                        <div className="confirmation-buttons">

                            <button
                                onClick={() => {
                                    if (!hasFinished.current) {
                                        hasFinished.current = true;
                                        setShowConfirmation(false);
                                        onFinished();
                                    }
                                }}
                            >
                                Confirm
                            </button>
                            <button onClick={() => setShowConfirmation(false)}>
                                Cancel
                            </button>

                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}