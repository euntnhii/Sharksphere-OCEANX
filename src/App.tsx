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
import { Narrator } from "./components/Narrator/Narrator";
import { NarratorBubble } from "./components/Narrator/NarratorBubble";
import { narrationScripts } from "./narration/narrationScript";
import { playDialogue } from "./narration/narrationController";
import { NarrationOverlay } from "./components/Narrator/NarrationOverlay";
import { ExplorationTimer } from "./components/ExplorationTimer";

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
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const currentDialogue = narrationScripts[currentDialogueIndex];
  const [hasMovedSlider, setHasMovedSlider] = useState(false);
  const [isExplorationActive, setIsExplorationActive] = useState(false);

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


  function advanceDialogue() {
    const nextIndex = currentDialogueIndex + 1;

    if (nextIndex < narrationScripts.length) {
      setCurrentDialogueIndex(nextIndex);
    } else {
      setIsExplorationActive(true);
    }
  }

  function handleModalClose() {
    setSelectedSpecies(null);

    if (currentDialogue.advance === "modal-close") {
      advanceDialogue();
    }
  }

  //play dialogue when currentDialogueIndex changes
  useEffect(() => {
    if (!hasStarted) return;

    const dialogue = narrationScripts[currentDialogueIndex];

    const audio = playDialogue(dialogue.id, () => {

      if (dialogue.advance !== "auto") {
        return;
      }

      setTimeout(
        advanceDialogue,
        dialogue.pauseAfter ?? 0
      );
    });

    return () => {
      audio?.pause();
      audio?.removeAttribute("src");
      audio?.load();
    };
  }, [currentDialogueIndex, hasStarted]);

  //handle start simulation
  function handleStart() {
    setHasStarted(true);

    audioRef.current?.play().catch(console.error);
  }

  //update states
  async function handleSimulationUpdate(newSharkPopulation: number) {

    //tutorial part (advance dialogue after user engages with slider)
    if (
      currentDialogue.advance === "slider" &&
      !hasMovedSlider
    ) {
      setHasMovedSlider(true);
      setTimeout(() => {
        advanceDialogue();
      }, 800);
    }

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

      <NarrationOverlay mode={currentDialogue.overlay}
      />

      <div className="mission-header">Mission 2</div>

      <div className="screen-display">

        <div className="display-column" id="display-panel">
          <DisplayPanel
            ecosystemState={ecosystemState}
            anomalyResult={anomalyResult}
            onSpeciesClick={setSelectedSpecies}
            blinkingSpecies={blinkingSpecies}
            setBlinkingSpecies={setBlinkingSpecies}
            blinkEnabled={blinkEnabled}
          />
        </div>

        <div className="right-column" id="right-column">

          <div className="simulation-frame" id="simulation-frame">
            <div className="simulation-viewport">
              <EcosystemCanvas
                ecosystemState={ecosystemState}
                entities={entities}
                onSpeciesClick={setSelectedSpecies}
              />
            </div>
          </div>

          <div className="slider-section" id="slider-section">
            <Slider
              sharkPopulation={ecosystemState.populations.apexPredator}
              onSliderChange={handleSimulationUpdate}
            />
          </div>

        </div>

      </div>

      <div className="narrator-section">
        <div className="narrator-avatar">
          <Narrator />
        </div>

        <div className="narrator-bubble">
          <NarratorBubble text={currentDialogue.text} />
        </div>

        <div className="exploration-timer">
          {isExplorationActive && (
            <ExplorationTimer
              duration={120}
              unlockAfter={30}
              onFinished={() => {
                console.log("Exploration finished");
              }}
            />
          )}
        </div>
      </div>

      <SpeciesInfoModal
        species={selectedSpecies}
        ecosystemState={ecosystemState}
        onClose={handleModalClose}
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

