//contains functions that modify entity positions (entity update logic)

import type { FishEntity, SharkEntity } from "../types/simulationEntity";
import { speciesConfig } from "./speciesConfig";

export function checkBoundary(entity: FishEntity | SharkEntity, canvasWidth: number) {

    const config = speciesConfig[entity.role];

    //set boundary
    if (entity.x > canvasWidth - config.drawWidth) {
        entity.x = canvasWidth - config.drawWidth;
        entity.direction.x = -1;
    };

    if (entity.x < 0) {
        entity.x = 0;
        entity.direction.x = 1;
    };

    if (entity.y > config.maxY) {
        entity.y = config.maxY;
        entity.direction.y = -1;
    };

    if (entity.y < config.minY) {
        entity.y = config.minY;
        entity.direction.y = 1;
    };
};


export function updateMovement(entity: FishEntity | SharkEntity) {
    entity.x = entity.x + entity.direction.x * entity.velocity;
    entity.y = entity.y + entity.direction.y * entity.velocity;

    //update sprite facing direction
    if (entity.direction.x > 0) {
        entity.facing = "right";
    } else if (entity.direction.x < 0) {
        entity.facing = "left";
    };
};


export function updateSpeed(entity: FishEntity | SharkEntity) {
    entity.speedTimer += 1;
    const config = speciesConfig[entity.role];

    //choose new target speed every n no. of frames
    if (entity.speedTimer >= config.speedChangeInterval) {
        entity.speedTimer = 0;
        const variation = config.speedVariation;
        const multiplier = 1 - variation + Math.random() * variation * 2; //random multiplier between (1 - variation) and (1 + variation)
        entity.targetVelocity = config.baseSpeed * multiplier; //set new target speed
        entity.velocity += (entity.targetVelocity - entity.velocity) * config.acceleration; //smoothly transition to new target speed
    };
};


export function changeDirection(entity: FishEntity | SharkEntity) {
    entity.directionTimer += 1;

    //choose new direction every 180 frames
    if (entity.directionTimer >= 180) {

        if (Math.random() < 0.15) {
            entity.direction.x *= -1; // reverse horizontal direction (15% chance)
        }

        entity.direction.y = 0;
        entity.directionTimer = 0; //reset direction timer
    };
};