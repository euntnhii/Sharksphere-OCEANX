//receives text as prop and displays it in a bubble with a tail

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