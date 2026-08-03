import { useState, useEffect } from "react";
import "./NarrationOverlay.css";

type NarrationOverlayProps = {
    mode: "full" | "simulation" | "slider" | "display" | "anomaly" | "none";
};

type HighlightRect = {
    top: number;
    left: number;
    width: number;
    height: number;
};


export function NarrationOverlay({ mode }: NarrationOverlayProps) {

    const [highlightRect, setHighlightRect] = useState<HighlightRect | null>(null);

    useEffect(() => {

        let targetId: string | null = null;

        switch (mode) {

            case "simulation":
                targetId = "simulation-frame";
                break;

            case "slider":
                targetId = "right-column";
                break;

            case "display":
                targetId = "population-section";
                break;

            case "anomaly":
                targetId = "anomaly-panel";
                break;

            default:
                setHighlightRect(null);
                return;
        }

        const target = document.getElementById(targetId);

        if (!target) return;

        const updateRect = () => {

            if (!targetId) return;

            const target = document.getElementById(targetId);
            if (!target) return;

            const rect = target.getBoundingClientRect();

            setHighlightRect({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
        };

        updateRect();

        window.addEventListener("resize", updateRect);
        window.addEventListener("scroll", updateRect);

        return () => {
            window.removeEventListener("resize", updateRect);
            window.removeEventListener("scroll", updateRect);
        };

    }, [mode]);


    if (mode === "none") {
        return null;
    }

    if (!highlightRect || mode === "full") {
        return (
            <div className="narration-overlay" />
        );
    }

    return (
        <>
            {/* Top */}
            <div
                className="narration-overlay"
                style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: highlightRect.top,
                }}
            />

            {/* Left */}
            <div
                className="narration-overlay"
                style={{
                    top: highlightRect.top,
                    left: 0,
                    width: highlightRect.left,
                    height: highlightRect.height,
                }}
            />

            {/* Right */}
            <div
                className="narration-overlay"
                style={{
                    top: highlightRect.top,
                    left: highlightRect.left + highlightRect.width,
                    width: `calc(100% - ${highlightRect.left + highlightRect.width}px)`,
                    height: highlightRect.height,
                }}
            />

            {/* Bottom */}
            <div
                className="narration-overlay"
                style={{
                    top: highlightRect.top + highlightRect.height,
                    left: 0,
                    width: "100%",
                    height: `calc(100% - ${highlightRect.top + highlightRect.height}px)`,
                }}
            />
        </>
    );
}