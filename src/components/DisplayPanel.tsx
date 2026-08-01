import "./DisplayPanel.css";
import type { EcosystemState, AnomalyResult } from "../types/ecosystemState";
import { getEcoStatus, getStatusColorClass } from "../simulation/simulationEffects";
import { AnomalyIndicator } from "./AnomalyIndicator";

//props type
type DisplayPanelProps = {
    ecosystemState: EcosystemState;
    anomalyResult: AnomalyResult;
    onSpeciesClick: (species: string) => void;

    blinkingSpecies: string[];
    setBlinkingSpecies: React.Dispatch<React.SetStateAction<string[]>>;
    blinkEnabled: boolean;
};

export function DisplayPanel({
    ecosystemState,
    anomalyResult,
    onSpeciesClick,
    blinkingSpecies,
    setBlinkingSpecies,
    blinkEnabled
}: DisplayPanelProps) {

    function getSpeciesColor(species: string) {
        const simulationEffects = getEcoStatus(species, ecosystemState);
        const colorClass = getStatusColorClass(simulationEffects.ecoStatus);
        return colorClass;
    }

    function getSpeciesClasses(species: string) {
        const colorClass = getSpeciesColor(species);
        const blinkingClass = colorClass.replace("status", "blinking");
        return `${colorClass} ${blinkingClass} ${blinkEnabled ? "blinking-active" : ""
            }`;
    }


    function handleSpeciesClick(species: string) {
        onSpeciesClick(species);
        setBlinkingSpecies(current => current.filter(name => name !== species)); //remove species from blinking when clicked
    };

    return (
        <div className="display-panel">

            <div className="display-card">
                <div className="anomaly-section">
                    <AnomalyIndicator anomalyResult={anomalyResult} />
                </div>
            </div>

            <div className="display-card">
                {/* Left Section (Population counts) */}
                <div className="population-section">

                    <div className="population-row">

                        <h3 className={`species-name ${blinkEnabled && blinkingSpecies.includes("Blacktip Reef Shark")
                            ? getSpeciesClasses("Blacktip Reef Shark")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Blacktip Reef Shark")}>🦈 Blacktip Reef Shark</h3>
                        <strong>{Math.ceil(ecosystemState.populations["apexPredator"])}</strong>
                    </div>

                    <div className="population-row">

                        <h3 className={`species-name ${blinkEnabled && blinkingSpecies.includes("Striated Surgeonfish")
                            ? getSpeciesClasses("Striated Surgeonfish")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Striated Surgeonfish")}>🐟 Striated Surgeonfish</h3>
                        <strong>{Math.ceil(ecosystemState.populations["turfBrusher"])}</strong>
                    </div>

                    <div className="population-row">

                        <h3 className={`species-name ${blinkEnabled && blinkingSpecies.includes("Bullethead Parrotfish")
                            ? getSpeciesClasses("Bullethead Parrotfish")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Bullethead Parrotfish")}>🐟 Bullethead Parrotfish</h3>
                        <strong>{Math.ceil(ecosystemState.populations["herbivoreScraper"])}</strong>
                    </div>

                    <div className="population-row">

                        <h3 className={`species-name ${blinkEnabled && blinkingSpecies.includes("Manybar Goatfish")
                            ? getSpeciesClasses("Manybar Goatfish")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Manybar Goatfish")}>🐟 Manybar Goatfish</h3>
                        <strong>{Math.ceil(ecosystemState.populations["invertebrateHunter"])}</strong>
                    </div>

                    <div className="population-row">

                        <h3 className={`species-name ${blinkEnabled && blinkingSpecies.includes("Cleaner Shrimp")
                            ? getSpeciesClasses("Cleaner Shrimp")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Cleaner Shrimp")}>🦐 Cleaner Shrimp</h3>
                        <strong>{Math.ceil(ecosystemState.populations["smallInvertebrate"])}</strong>
                    </div>

                    <div className="population-row">

                        <h3 className={`species-name ${blinkEnabled && blinkingSpecies.includes("Reef Builder")
                            ? getSpeciesClasses("Reef Builder")
                            : ""
                            }`}

                            onClick={() => handleSpeciesClick("Reef Builder")}>🪸 Reef Builder Health</h3>
                        <strong>{ecosystemState.coralHealth.toFixed(2)}%</strong>
                    </div>

                </div>
            </div>
        </div>

    );
}