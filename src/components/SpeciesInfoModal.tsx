import "./SpeciesInfoModal.css";
import type { EcosystemState } from "../types/ecosystemState";
import { getEcoStatus, getStatusColorClass } from "../simulation/simulationEffects";
import { getSharkImpactMessage } from "../simulation/sharkImpact";
import sharkSprite from "../assets/blacktip_reef_shark_sprite1.png";
import sharkImage from "../assets/blacktip_reef_shark_img.png";
import surgeonfishSprite from "../assets/striated_surgeonfish_sprite1.png";
import surgeonfishImage from "../assets/striated_surgeonfish_img.png";
import parrotfishSprite from "../assets/bullethead_parrotfish_sprite1.png";
import parrotfishImage from "../assets/bullethead_parrotfish_img.png";
import goatfishSprite from "../assets/manybar_goatfish_sprite1.png";
import goatfishImage from "../assets/manybar_goatfish_img.png";
import shrimpSprite from "../assets/shrimp_sprite1.png";
import shrimpImage from "../assets/shrimp_img.png";
import reefBuilderSprite from "../assets/reef_builder_sprite1.png";
import reefBuilderImage from "../assets/reef_builder_img.png";

type SpeciesInfoModalProps = {
    species: string | null;
    ecosystemState: EcosystemState;
    onClose: () => void; //callback function to close modal
}

type SpeciesInfo = {
    commonName: string;
    scientificName: string;
    image1: string;
    image2: string;
    ecologicalRole: string;
    effectOnEcosystem: string;
    about: string;
    fact: string;
};

export function SpeciesInfoModal({ species, ecosystemState, onClose }: SpeciesInfoModalProps) {

    const speciesInfo: Record<string, SpeciesInfo> = {
        "Blacktip Reef Shark": {
            commonName: "Blacktip Reef Shark",
            scientificName: "Carcharhinus melanopterus",
            image1: sharkSprite,
            image2: sharkImage,
            ecologicalRole: "Apex Predator",
            effectOnEcosystem: "Blacktip Reef Sharks are one of the reef's top predators. They patrol coral reefs for prey, hunting a variety of animals which helps maintain a balanced food web.",
            about: "The Blacktip Reef Shark is a small, slender shark, commonly found in shallow waters of the Indian and Pacific Oceans. It usually grows to about 1.5 to 1.8 meters long and is easily recognized by the black tip on its fins.",
            fact: "Despite their appearance, Blacktip Reef Sharks are generally shy around people and are not considered dangerous. They usually swim away if a diver or snorkeler gets too close."
        },
        "Striated Surgeonfish": {
            commonName: "Striated Surgeonfish",
            scientificName: "Ctenochaetus striatus",
            image1: surgeonfishSprite,
            image2: surgeonfishImage,
            ecologicalRole: "Turf Brusher",
            effectOnEcosystem: "Striated Surgeonfishes graze on fine algae and remove organic debris on coral surfaces, keeping coral reefs healthy.",
            about: "The Striated Surgeonfish is a tropical reef fish found throughout the Indian and Pacific Oceans. It is usually about 15 to 25cm long and has a grayish body with fine horizontal stripes, giving it a striated appearance.",
            fact: "Striated Surgeonfishes have rows of small, comb-like teeth, allowing them to sweep up fine algae and detritus that collect on reef surfaces without damaging the coral underneath."
        },
        "Bullethead Parrotfish": {
            commonName: "Bullethead Parrotfish",
            scientificName: "Chlorurus sordidus",
            image1: parrotfishSprite,
            image2: parrotfishImage,
            ecologicalRole: "Herbivore Scraper",
            effectOnEcosystem: "Bullethead Parrotfishes constantly graze on algae, helping to keep reef surfaces clean and open for corals to grow.",
            about: "The Bullethead Parrotfish is a common tropical reef fish found throughout the Indian and Pacific Oceans. It is usually about 30 to 50cm long and has a rounded, blunt-shaped forehead that gives it a bullet-like appearance.",
            fact: "Bullethead Parrotfishes have teeth that are fused together, forming a strong, beak-like structure that allows them to scrape alage off rocks and dead coral surfaces. "
        },
        "Manybar Goatfish": {
            commonName: "Manybar Goatfish",
            scientificName: "Parupeneus multifasciatus",
            image1: goatfishSprite,
            image2: goatfishImage,
            ecologicalRole: "Invertebrate Prey Hunter",
            effectOnEcosystem: "Manybar Goatfishes feed on small invertebrates likes shrimps and worms, helping to keep their populations in balance.",
            about: "The Manybar Goatfish is a colourful tropical fish that lives around coral reefs in the Indian and Pacific Oceans. It is usually about 20 to 30cm long and easily recognized by the dark vertical bars running along its body.",
            fact: "Manybar Goatfishes have a pair of whisker-like barbels under its chin. These barbels are packed with sensory cells that help the fish hidden detect prey under the sand."
        },
        "Cleaner Shrimp": {
            commonName: "Cleaner Shrimp",
            scientificName: "Lysmata amboinensis",
            image1: shrimpSprite,
            image2: shrimpImage,
            ecologicalRole: "Small Invertebrate",
            effectOnEcosystem: "Cleaner Shrimps provide cleaning services to fishes by removing parasites and dead tissues from their body, keeping them healthy.",
            about: "The Cleaner Shrimp is a small, brightly coloured shrimp that lives on coral reefs in tropical oceans. It usually grows to about 5 to 7cm long, and its best-known species, the Scarlet Skunk Cleaner Shrimp, has a bright red body with a bold white stripe running down its back.",
            fact: "Cleaner Shrimps are known for their symbiotic relationships with fishes. Large predators like groupers allow these shrimps to clean them without trying to eat them."
        },
        "Reef Builder": {
            commonName: "Reef-Building Coral",
            scientificName: "Scleractinia",
            image1: reefBuilderSprite,
            image2: reefBuilderImage,
            ecologicalRole: "Habitat Former",
            effectOnEcosystem: "Coral Reefs provide homes to numerous marine species, allowing the animals to depend on it for food, shelter, and breeding grounds.",
            about: "Coral reefs are formed by tiny animals called coral polyps. Coral polyps live in huge colonies and produce hard skeletons that accumulate to form massive coral reefs. Because these corals create the reef itself, they are called reef builders.",
            fact: "Corals have many shapes, each with a different role: branching corals create shelter, massive corals provide stability, and plate corals maximise sunlight and provide habitat."
        }
    }

    if (!species) {
        return null; //dont render modal if no species is selected
    };

    const info = speciesInfo[species];

    if (!info) {
        return null
    };

    const simulationEffects = getEcoStatus(species, ecosystemState);
    const statusColorClass = getStatusColorClass(simulationEffects.ecoStatus);
    const sharkImpactMessage = getSharkImpactMessage(species, simulationEffects.ecoStatus);

    return (
        <div className="modal-overlay">

            <div className="modal">

                {/* Modal Header */}
                <h2 className="species-title">
                    {species}
                    <span className="scientific-name">({info.scientificName})</span>
                    <img src={info.image1} alt={`${species} sprite`} className="species-sprite" />
                </h2>

                {/* Simulation effects (how they are affected in simulation*/}
                <div className={`simulation-effects ${statusColorClass}`}>
                    <p>
                        <b> Eco-status Impact: </b>
                        <b className={`eco-status ${statusColorClass}`}>{simulationEffects.ecoStatus}</b>
                    </p>
                    <br />
                    <p>
                        <b> Impact from Shark Population: </b>
                        <br />
                        <span className="shark-impact-message">{sharkImpactMessage}</span>
                    </p>
                </div>


                {/* Modal Content Part 1 (Scientific) */}
                <div className="content-part1">
                    <img src={info.image2} alt={`${species} image`} className="species-image" />
                    <div className="content-info-part1">
                        <p>
                            <b> Ecological Role: </b>
                            <br />
                            <span className="para">{info.ecologicalRole}</span>
                        </p>
                        <br />
                        <p>
                            <b> Contribution to ecosystem: </b>
                            <br />
                            <span className="para">{info.effectOnEcosystem}</span>
                        </p>
                    </div>
                </div>


                {/* Modal Content Part 2 (Scientific) */}
                <div className="content-part2">
                    <p>
                        <b> About {info.commonName}s: </b>
                        <br />
                        <span className="para">{info.about}</span>
                    </p>
                    <br />
                    <p>
                        <b> Fun Fact: </b>
                        <br />
                        <span className="para">{info.fact}</span>
                    </p>
                </div>

                <button className="close-modal" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}