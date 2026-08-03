//display current narration text in a speech bubble

import "./NarratorBubble.css";

type NarratorBubbleProps = {
    text: string;
    onClick?: () => void;
};

export function NarratorBubble({ text, onClick }: NarratorBubbleProps) {
    return (
        <div className="speech-bubble" onClick={onClick}>
            <p>{text}</p>
        </div>
    );
}