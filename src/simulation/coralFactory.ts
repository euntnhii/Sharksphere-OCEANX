//generate static coral reef layout for simulation

import type { CoralEntity } from "../types/simulationEntity";

export function createCorals(): CoralEntity[] {
    const corals: CoralEntity[] = [];

    //center position of each reef group
    const reefGroups = [
        { x: 120, y: 410 },
        { x: 400, y: 410 },
        { x: 680, y: 410 }
    ];

    //relative positions of corals within each reef group
    const reefLayout = [
        { x: -70, y: 20 },
        { x: -40, y: 0 },
        { x: 20, y: 0 },
        { x: -10, y: 25 },
        { x: 20, y: 5 },
        { x: 45, y: 20 },
        { x: -30, y: 10 },
        { x: -55, y: 28 },
        { x: -15, y: 30 },
        { x: 30, y: 28 },
        { x: 60, y: 30 },
        { x: -50, y: 38 },
        { x: 10, y: 38 },
        { x: 40, y: 38 }
    ];

    const coralShapes = [
        "branching", "branching", "branching", "branching", "branching", "branching", "branching",
        "massive", "massive", "massive",
        "plate", "plate", "plate", "plate"
    ] as const;


    reefGroups.forEach((reef, reefIndex) => {

        const shapes = [...coralShapes].sort(() => Math.random() - 0.5); //randomize coral shapes

        reefLayout.forEach((offset, index) => {
            corals.push({
                id: `coral-${reefIndex}-${index}`,
                x: reef.x + offset.x,
                y: reef.y + offset.y,
                species: shapes[index],
                role: "reefBuilder",
                layer: Math.random() < 0.5 ? "front" : "back",
                variation: Math.floor(Math.random() * 3) as 0 | 1 | 2
            });
        });
    });

    return corals;
};