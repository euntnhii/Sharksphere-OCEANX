//render ocean protector

import "./Narrator.css";
import narratorImage from "../../assets/oceanProtector/fin-pose-1.png";

export function StartNarrator() {
    return (
        <div className="start-narrator">
            <img
                src={narratorImage}
                alt="Narrator"
                className="start-narrator-image"
            />
        </div>
    );
}