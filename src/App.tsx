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
import type { SharkZone } from "./narration/addNarration";
import { addNarration, getExplorationZone, endExplorationNarration } from "./narration/addNarration";
import { playNarration } from "./narration/addNarrationController";

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
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState<number | null>(0);
  const currentDialogue = currentDialogueIndex === null ? null : narrationScripts[currentDialogueIndex];
  const [hasMovedSlider, setHasMovedSlider] = useState(false);
  const [isExplorationActive, setIsExplorationActive] = useState(false);
  const [sliderLocked, setSliderLocked] = useState(false);
  const [additionalNarration, setAdditionalNarration] = useState<string | null>(null);
  const lastZoneRef = useRef<SharkZone | null>(null);
  const narrationTimeoutRef = useRef<number | null>(null);
  const [isZoneNarrating, setIsZoneNarrating] = useState(false);
  const isZoneNarratingRef = useRef(false);
  const narratorText = additionalNarration ?? currentDialogue?.text;
  const [explorationFinished, setExplorationFinished] = useState(false);
  const hasPlayedEndNarrationRef = useRef(false);
  const anomalyTimeoutRef = useRef<number | null>(null);


  //load audio
  useEffect(() => {
    const audio = new Audio(underwater_ambience);
    audio.loop = true;
    audio.volume = 0.6;

    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);


  function advanceDialogue() {

    if (currentDialogueIndex === null) return;

    const nextIndex = currentDialogueIndex + 1;

    if (nextIndex < narrationScripts.length) {
      setCurrentDialogueIndex(nextIndex);
    } else {
      setCurrentDialogueIndex(null);
      setIsExplorationActive(true);
    }

  }

  function handleModalClose() {
    setSelectedSpecies(null);

    if (currentDialogue?.advance === "modal-close") {
      setTimeout(
        advanceDialogue, currentDialogue.pauseAfter ?? 0);
    }
  }

  //play dialogue when currentDialogueIndex changes
  useEffect(() => {
    if (!hasStarted || currentDialogueIndex === null) return;

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
  }

  //update states
  async function handleSimulationUpdate(newSharkPopulation: number) {

    //tutorial part (advance dialogue after user engages with slider)
    if (
      currentDialogue?.advance === "slider" &&
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

    //handle anomaly result after delay
    if (anomalyTimeoutRef.current) {
      clearTimeout(anomalyTimeoutRef.current);
    }

    anomalyTimeoutRef.current = window.setTimeout(async () => {
      const result = await getAnomalyResult(newEcosystemState);
      setAnomalyResult(result);
    }, 700);

    // Stop all blinking
    setBlinkingSpecies([]);
    setBlinkEnabled(false);

    // Wait one frame, then start everyone together
    requestAnimationFrame(() => {
      setBlinkingSpecies(allSpecies);
      setBlinkEnabled(true);
    });

    // Additional narration
    if (!isExplorationActive) {
      return;
    }

    if (narrationTimeoutRef.current) {
      clearTimeout(narrationTimeoutRef.current);
    }

    narrationTimeoutRef.current = window.setTimeout(async () => {
      const zone = getExplorationZone(newSharkPopulation);

      if (zone === lastZoneRef.current || isZoneNarratingRef.current) {
        return;
      }

      const narration = addNarration[zone].narration;

      isZoneNarratingRef.current = true;
      setSliderLocked(true);
      setIsZoneNarrating(true);

      await playNarration(narration, {
        onStart: () => {

        },

        onText: (text) => {
          setAdditionalNarration(text);
        },

        onFinish: () => {
          setAdditionalNarration(null);
          setSliderLocked(false);
          setIsZoneNarrating(false);
          isZoneNarratingRef.current = false;
        }
      });

      lastZoneRef.current = zone;


    }, 600);

  };

  //play audio during exploration mode
  useEffect(() => {
    if (!audioRef.current) return;

    if (isExplorationActive) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isExplorationActive]);

  //cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (narrationTimeoutRef.current) {
        clearTimeout(narrationTimeoutRef.current);
      }
    };
  }, []);

  //handle exploration finished
  useEffect(() => {
    if (!explorationFinished) return;

    if (isZoneNarratingRef.current) return;

    if (hasPlayedEndNarrationRef.current) return;

    hasPlayedEndNarrationRef.current = true;

    async function finishExploration() {

      isZoneNarratingRef.current = true;
      setSliderLocked(true);
      setIsZoneNarrating(true);

      await playNarration(endExplorationNarration, {
        onStart: () => { },

        onText: (text) => {
          setAdditionalNarration(text);
        },

        onFinish: () => {
          setAdditionalNarration(null);
          setIsZoneNarrating(false);
          isZoneNarratingRef.current = false;
        }
      });

      setIsExplorationActive(false);

      window.location.href = "https://yhtan752-ai.github.io/ocean-research-mission/pages/index7.html"
    }

    finishExploration();

  }, [explorationFinished, isZoneNarrating]);


  //UI to return
  return (

    <div className="app-layout">

      <NarrationOverlay mode={currentDialogue?.overlay ?? "none"}
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
              disabled={sliderLocked}
            />
          </div>

        </div>

      </div>

      <div className="narrator-section">
        <div className="narrator-avatar">
          <Narrator />
        </div>

        {narratorText && (
          <div className="narrator-bubble">
            <NarratorBubble text={narratorText} />
          </div>
        )}

        <div className="exploration-timer">
          {isExplorationActive && (
            <ExplorationTimer
              duration={120}
              unlockAfter={30}
              onFinished={() => {
                setSliderLocked(true);
                setExplorationFinished(true);
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

