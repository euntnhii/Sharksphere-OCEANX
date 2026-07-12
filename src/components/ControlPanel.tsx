import "./ControlPanel.css";
import type { EcosystemState, AnomalyResult } from "../types/ecosystemState";
import { getEcoStatus, getStatusColorClass } from "../simulation/simulationEffects";
import { AnomalyIndicator } from "./AnomalyIndicator";
import { SpeciesInfoModal } from "./SpeciesInfoModal";
import { useState } from "react";

type ControlPanelProps = {
    ecosystemState: EcosystemState;
    anomalyResult: AnomalyResult;
    onSliderChange: (sharkPopulation: number) => void;
};


export function ControlPanel({
    ecosystemState,
    anomalyResult,
    onSliderChange,
}: ControlPanelProps) {

    function getSpeciesColor(species: string) {
        const simulationEffects = getEcoStatus(species, ecosystemState);
        const colorClass = getStatusColorClass(simulationEffects.ecoStatus);
        return colorClass;
    }

    function getSpeciesClasses(species: string) {
        const colorClass = getSpeciesColor(species);
        const blinkingClass = colorClass.replace("status", "blinking");
        return `${colorClass} ${blinkingClass}`;
    }

    const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null); //state to track which species is selected for the modal
    const [blinkingSpecies, setBlinkingSpecies] = useState<string[]>([]); //state to track species that are blinking
    const allSpecies = ["Blacktip Reef Shark", "Striated Surgeonfish", "Bullethead Parrotfish", "Manybar Goatfish", "Cleaner Shrimp", "Reef Builder"];

    function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
        onSliderChange(Number(event.target.value));
        setBlinkingSpecies([]); //reset blinking species when slider changes
        setTimeout(() => {
            setBlinkingSpecies(allSpecies);
        }, 0);
    };

    function handleSpeciesClick(species: string) {
        setSelectedSpecies(species);
        setBlinkingSpecies(current => current.filter(name => name !== species)); //remove species from blinking when clicked
    };

    return (
        <div className="control-panel">

            <div className="panel-content">

                {/* Left Section (Population counts) */}
                <div className="population-section">

                    <h3>Ecosystem Populations</h3>

                    <div className="population-row">
                        <span>🦈 </span>
                        <span className={`species-name ${blinkingSpecies.includes("Blacktip Reef Shark")
                            ? getSpeciesClasses("Blacktip Reef Shark")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Blacktip Reef Shark")}>Blacktip Reef Shark: </span>
                        <strong>{Math.ceil(ecosystemState.populations["apexPredator"])}</strong>
                    </div>

                    <div className="population-row">
                        <span>🐟 </span>
                        <span className={`species-name ${blinkingSpecies.includes("Striated Surgeonfish")
                            ? getSpeciesClasses("Striated Surgeonfish")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Striated Surgeonfish")}>Striated Surgeonfish: </span>
                        <strong>{Math.ceil(ecosystemState.populations["turfBrusher"])}</strong>
                    </div>

                    <div className="population-row">
                        <span>🐟 </span>
                        <span className={`species-name ${blinkingSpecies.includes("Bullethead Parrotfish")
                            ? getSpeciesClasses("Bullethead Parrotfish")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Bullethead Parrotfish")}>Bullethead Parrotfish: </span>
                        <strong>{Math.ceil(ecosystemState.populations["herbivoreScraper"])}</strong>
                    </div>

                    <div className="population-row">
                        <span>🐟 </span>
                        <span className={`species-name ${blinkingSpecies.includes("Manybar Goatfish")
                            ? getSpeciesClasses("Manybar Goatfish")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Manybar Goatfish")}>Manybar Goatfish: </span>
                        <strong>{Math.ceil(ecosystemState.populations["invertebrateHunter"])}</strong>
                    </div>

                    <div className="population-row">
                        <span>🦐 </span>
                        <span className={`species-name ${blinkingSpecies.includes("Cleaner Shrimp")
                            ? getSpeciesClasses("Cleaner Shrimp")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Cleaner Shrimp")}>Cleaner Shrimp: </span>
                        <strong>{Math.ceil(ecosystemState.populations["smallInvertebrate"])}</strong>
                    </div>

                    <div className="population-row">
                        <span>🪸 </span>
                        <span className={`species-name ${blinkingSpecies.includes("Reef Builder")
                            ? getSpeciesClasses("Reef Builder")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Reef Builder")}>Reef Builder Health: </span>
                        <strong>{ecosystemState.coralHealth.toFixed(2)}%</strong>
                    </div>

                </div>

                <SpeciesInfoModal
                    species={selectedSpecies}
                    ecosystemState={ecosystemState}
                    onClose={() => setSelectedSpecies(null)}
                />

                {/* Right Section (Shark slider and anomaly score) */}
                <div className="slider-section">

                    <h3>Shark Population: {Math.ceil(ecosystemState.populations.apexPredator)}</h3>

                    <div className="slider-container">

                        <input
                            className="population-slider"
                            type="range"
                            min="0"
                            max="14"
                            value={ecosystemState.populations.apexPredator}
                            onChange={handleSliderChange}
                        />
                    </div>

                    <div className="slider-labels">
                        <span>0 Sharks</span>
                        <span>14 Sharks</span>
                    </div>

                    <h3 className="anomaly-indicator">
                        <AnomalyIndicator anomalyResult={anomalyResult} />
                    </h3>

                </div>

            </div>

        </div>
    );
}