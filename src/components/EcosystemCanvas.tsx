import { useRef, useEffect } from "react";
import type { EcosystemState } from "../types/ecosystemState";
import type { DrawingEntity } from "../types/drawingEntity";
import type { EcosystemEntities, FishEntity, SharkEntity } from "../types/simulationEntity";
import type { AnimatedSprite } from "../types/spriteSheet";
import { useAssets } from "../hooks/useAssets";
import { updateMovement, checkBoundary, updateSpeed, changeDirection } from "../simulation/entityMovement";
import { updateAnimation } from "../simulation/entityAnimation";
import { speciesConfig, coralConfig } from "../simulation/speciesConfig";
import { drawEnvironment } from "../render/drawEnvironment";
import { createCorals } from "../simulation/coralFactory";


//create props type
type EcosystemCanvasProps = {
    ecosystemState: EcosystemState;
    entities: EcosystemEntities; //canvas receives entities to draw based on ecosystem state
};


export function EcosystemCanvas(props: EcosystemCanvasProps) {

    const assets = useAssets();
    const canvasRef = useRef<HTMLCanvasElement | null>(null); //reference to canvas element
    const animationFrameIdRef = useRef<number | null>(null); //reference to store animation frame id
    const coralRef = useRef(createCorals()); //reference to store coral entities

    //select sprite based on species role
    function getEntitySprite(entity: FishEntity | SharkEntity): AnimatedSprite {
        return assets.fish[entity.role]
    };



    useEffect(() => {
        //check if canvas exists
        if (!canvasRef.current) {
            return;
        } else {
            const canvas = canvasRef.current; //get canvas element (drawing surface)
            const context = canvas.getContext("2d"); //create context (object that contains drawing methods and properties)

            //check if context exists
            if (!context) {
                return;
            } else {

                const safeContext = context; //create a confirmed context variable to avoid null errors

                //generic function to draw entity
                function drawEntity(sprite: AnimatedSprite, entity: DrawingEntity & { facing: "left" | "right" }, frameIndex: number) {

                    //calculate frame to crop
                    const column = frameIndex % sprite.columns;
                    const row = Math.floor(frameIndex / sprite.columns);

                    //calculate source position
                    const sourceX = column * sprite.frameWidth;
                    const sourceY = row * sprite.frameHeight;

                    if (entity.facing === "right") {
                        safeContext.drawImage(
                            sprite.image,
                            sourceX, sourceY, sprite.frameWidth, sprite.frameHeight, //source rectangle
                            entity.x, entity.y, entity.width, entity.height //destination rectangle
                        );

                    } else if (entity.facing === "left") {
                        safeContext.save();
                        safeContext.translate(entity.x + entity.width, entity.y); //translate canvas to entity center 
                        safeContext.scale(-1, 1); //flip canvas horizontally
                        safeContext.drawImage(
                            sprite.image,
                            sourceX, sourceY, sprite.frameWidth, sprite.frameHeight, //source rectangle
                            0, 0, entity.width, entity.height //destination rectangle
                        );
                        safeContext.restore(); //restore canvas state
                    };
                };

                //update fish position 
                function updateFish() {
                    props.entities.fishes.forEach((fish) => {
                        updateSpeed(fish);
                        changeDirection(fish); updateMovement(fish);
                        updateAnimation(fish);
                        checkBoundary(fish, canvas.width);
                    });
                };

                //update shark position
                function updateShark() {
                    props.entities.sharks.forEach((shark) => {
                        updateSpeed(shark);
                        changeDirection(shark); updateMovement(shark);
                        updateAnimation(shark);
                        checkBoundary(shark, canvas.width);
                    });
                };

                //draw fish entities
                function drawFish() {
                    props.entities.fishes.forEach((fish) => {

                        const config = speciesConfig[fish.role];

                        const drawingFish = {
                            x: fish.x,
                            y: fish.y,
                            width: config.drawWidth,
                            height: config.drawHeight,
                            facing: fish.facing
                        }; //convert to drawing entity

                        const fishSprite = getEntitySprite(fish); //get sprite based on species role
                        if (!fishSprite) {
                            return;
                        };
                        drawEntity(fishSprite, drawingFish, fish.frameIndex); //draw fish entity
                    });
                };

                //draw shark entities
                function drawShark() {
                    props.entities.sharks.forEach((shark) => {

                        const config = speciesConfig[shark.role];

                        const drawingShark = {
                            x: shark.x,
                            y: shark.y,
                            width: config.drawWidth,
                            height: config.drawHeight,
                            facing: shark.facing
                        }; //convert to drawing entity
                        drawEntity(assets.fish.apexPredator, drawingShark, shark.frameIndex); //draw shark entity
                    });
                };

                //draw coral entity
                function drawCorals() {

                    coralRef.current.forEach((coral) => {

                        const state = props.ecosystemState.coralHealth > 40 ? "healthy" : "dead";
                        const sprite = assets.coral[coral.species][state][coral.variation];
                        const config = coralConfig[coral.species];

                        safeContext.drawImage(sprite.image, coral.x, coral.y, config.width, config.height);
                    });
                };


                function animate() {

                    updateFish();
                    updateShark();

                    safeContext.clearRect(0, 0, canvas.width, canvas.height);

                    drawEnvironment(safeContext, canvas);
                    drawCorals();
                    drawFish();
                    drawShark();

                    animationFrameIdRef.current = requestAnimationFrame(animate); //request next frame of animation (animation loop) and store animation frame id
                }; //coordinate update and draw


                //start animation and store animation frame id after images load
                const images = Object.values(assets.fish);
                let loadedImages = 0;
                images.forEach((sprite) => {
                    if (sprite.image.complete) {
                        loadedImages++;
                    } else {
                        sprite.image.onload = () => {
                            loadedImages++;

                            if (loadedImages === images.length) {
                                animationFrameIdRef.current = requestAnimationFrame(animate);
                            };
                        };
                    };
                });

                if (loadedImages === images.length) {
                    animationFrameIdRef.current = requestAnimationFrame(animate);
                };


                //cleanup function (stop animation when component unmounts)
                return () => {
                    if (animationFrameIdRef.current === null) {
                        return;
                    } else {
                        cancelAnimationFrame(animationFrameIdRef.current); //cancel animation frame
                        animationFrameIdRef.current = null; //reset animation frame id (null - no active animation)
                    };
                };
            };
        };
    }, [props.entities]); //re-run when entities change (new entities created based on updated ecosystem state)

    return (
        <canvas ref={canvasRef} width={900} height={500}></canvas>
    );
};



