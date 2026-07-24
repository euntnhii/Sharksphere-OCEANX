import { useState, useEffect } from "react";
import "./App.css";
import underwater_ambience from "./assets/audio/underwater_ambience.mp3";
import type { EcosystemState, AnomalyResult } from "./types/ecosystemState";
import { initialEcosystemState, initialAnomalyResult } from "./simulation/initialEcosystemPopulation";
import { updateSimulation } from "./simulation/ecosystemSimulation";
import { getAnomalyResult } from "./api/anomalyService";
import { DisplayPanel } from "./components/DisplayPanel";
import { EcosystemCanvas } from "./components/EcosystemCanvas";
import { createEntityArray } from "./simulation/entityFactory";
import { SpeciesInfoModal } from "./components/SpeciesInfoModal";
import { Slider } from "./components/Slider";

export function App() {

  useEffect(() => {
    const audio = new Audio(underwater_ambience);
    audio.loop = true;
    audio.volume = 0.7;

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });

    return () => {
      audio.pause();
    };
  }, []);

  //create states
  const [sharkPopulation, setSharkPopulation] = useState(initialEcosystemState.populations.apexPredator);
  const [ecosystemState, setEcosystemState] = useState<EcosystemState>(initialEcosystemState);
  const [anomalyResult, setAnomalyResult] = useState<AnomalyResult>(initialAnomalyResult);
  const [entities, setEntities] = useState(createEntityArray(initialEcosystemState));
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null); //state to track which species is selected for the modal
  const [blinkingSpecies, setBlinkingSpecies] = useState<string[]>([]); //state to track blinking
  const allSpecies = ["Blacktip Reef Shark", "Striated Surgeonfish", "Bullethead Parrotfish", "Manybar Goatfish", "Cleaner Shrimp", "Reef Builder"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //update states
  function handleSimulationUpdate(newSharkPopulation: number) {

    //update shark population
    setSharkPopulation(newSharkPopulation);

    //create new ecosystem state
    const newEcosystemState = updateSimulation(newSharkPopulation);

    //update ecosystem state
    setEcosystemState(newEcosystemState);

    //create new entities based on updated ecosystem state
    const newEntities = createEntityArray(newEcosystemState);

    //update entities
    setEntities(newEntities);

    //create new anomaly result
    const newAnomalyResult = getAnomalyResult(newEcosystemState);

    //update anomaly result
    setAnomalyResult(newAnomalyResult);

    setBlinkingSpecies([]);

    setTimeout(() => {
      setBlinkingSpecies(allSpecies);
    }, 0);
  };

  //UI to return
  return (

    <div className="app-layout">

      <div className="top-section">
        <div className="left-panel">

          <div className="canvas-container">
            <EcosystemCanvas
              ecosystemState={ecosystemState}
              entities={entities}
              onSpeciesClick={setSelectedSpecies}
            />
          </div>

        </div>

        <div className="right-panel">

          <DisplayPanel
            ecosystemState={ecosystemState}
            anomalyResult={anomalyResult}
            onSpeciesClick={setSelectedSpecies}
            blinkingSpecies={blinkingSpecies}
            setBlinkingSpecies={setBlinkingSpecies}
          />
        </div>
      </div>

      <div className="bottom-section">
        <Slider
          sharkPopulation={ecosystemState.populations.apexPredator}
          onSliderChange={handleSimulationUpdate}
        />
      </div>

      <SpeciesInfoModal
        species={selectedSpecies}
        ecosystemState={ecosystemState}
        onClose={() => setSelectedSpecies(null)}
      />

    </div>
  );
};
