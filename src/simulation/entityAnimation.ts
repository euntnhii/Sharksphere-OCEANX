//update animation frame of entity sprite

import type { FishEntity, SharkEntity } from "../types/simulationEntity";

export function updateAnimation(entity: FishEntity | SharkEntity) {
    entity.frameTimer += 1; //increase frame timer

    //change sprite frame every 10 animation loops
    if (entity.frameTimer >= 10) {
        entity.frameIndex += 1;
        entity.frameTimer = 0;

        //loop back to first frame after last frame
        if (entity.frameIndex >= 25) {
            entity.frameIndex = 0;
        }
    };
};