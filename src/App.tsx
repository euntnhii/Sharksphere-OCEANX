import { useState, useEffect } from "react";
import underwater_ambience from "./assets/audio/underwater_ambience.mp3";
import type { EcosystemState, AnomalyResult } from "./types/ecosystemState";
import { initialEcosystemState, initialAnomalyResult } from "./simulation/initialEcosystemPopulation";
import { updateSimulation } from "./simulation/ecosystemSimulation";
import { getAnomalyResult } from "./api/anomalyService";
import { ControlPanel } from "./components/ControlPanel";
import { EcosystemCanvas } from "./components/EcosystemCanvas";
import { createEntityArray } from "./simulation/entityFactory";
import { SpeciesInfoModal } from "./components/SpeciesInfoModal";

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
  };

  //UI to return
  return (

    <>

      <EcosystemCanvas
        ecosystemState={ecosystemState}
        entities={entities}
        onSpeciesClick={setSelectedSpecies}
      />

      <ControlPanel
        ecosystemState={ecosystemState}
        anomalyResult={anomalyResult}
        onSliderChange={handleSimulationUpdate}
        onSpeciesClick={setSelectedSpecies}
      />

      <SpeciesInfoModal
        species={selectedSpecies}
        ecosystemState={ecosystemState}
        onClose={() => setSelectedSpecies(null)}
      />

    </>
  );
};
