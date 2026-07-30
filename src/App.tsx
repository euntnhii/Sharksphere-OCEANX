import { useState, useEffect, useRef } from "react";
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

  //audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  //create states
  const [ecosystemState, setEcosystemState] = useState<EcosystemState>(initialEcosystemState);
  const [anomalyResult, setAnomalyResult] = useState<AnomalyResult>(initialAnomalyResult);
  const [entities, setEntities] = useState(createEntityArray(initialEcosystemState));
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null); //state to track which species is selected for the modal
  const [blinkingSpecies, setBlinkingSpecies] = useState<string[]>([]); //state to track blinking
  const [blinkEnabled, setBlinkEnabled] = useState(false); //state to track if blinking is enabled
  const allSpecies = ["Blacktip Reef Shark", "Striated Surgeonfish", "Bullethead Parrotfish", "Manybar Goatfish", "Cleaner Shrimp", "Reef Builder"];
  const [hasStarted, setHasStarted] = useState(false);
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState<string | null>(null);

  //load audio
  useEffect(() => {
    const audio = new Audio(underwater_ambience);
    audio.loop = true;
    audio.volume = 0.7;

    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  //handle start simulation
  function handleStart() {
    setHasStarted(true);

    audioRef.current?.play().catch(console.error);
  }

  //update states
  async function handleSimulationUpdate(newSharkPopulation: number) {

    //create new ecosystem state
    const newEcosystemState = updateSimulation(newSharkPopulation);

    //update ecosystem state
    setEcosystemState(newEcosystemState);

    //create new entities based on updated ecosystem state
    const newEntities = createEntityArray(newEcosystemState);

    //update entities
    setEntities(newEntities);

    //create new anomaly result
    const newAnomalyResult = await getAnomalyResult(newEcosystemState);

    //update anomaly result
    setAnomalyResult(newAnomalyResult);

    // Stop all blinking
    setBlinkingSpecies([]);
    setBlinkEnabled(false);

    // Wait one frame, then start everyone together
    requestAnimationFrame(() => {
      setBlinkingSpecies(allSpecies);
      setBlinkEnabled(true);
    });
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
            blinkEnabled={blinkEnabled}
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

      {!hasStarted && (
        <div className="start-overlay" onClick={handleStart}>
          <div className="start-message">
            <h3>Click anywhere to begin</h3>
          </div>
        </div>
      )}
    </div>
  );
};

