//render ocean protector and speech bubble

import "./Narrator.css";
import narratorImage from "../../assets/oceanProtector/finPose5.png";

export function Narrator() {
    return (
        <div className="narrator">
            <img
                src={narratorImage}
                alt="Narrator"
                className="narrator-image"
            />
        </div>
    );
}