import { useRef, useEffect } from "react";
import blacktipReefSharkImage from "../assets/blacktip_reef_shark_sprite.png";
import bulletheadParrotfishImage from "../assets/bullethead_parrotfish_sprite.png";
import manybarGoatfishImage from "../assets/manybar_goatfish_sprite.png";
import shrimpImage from "../assets/shrimp_sprite.png";
import striatedSurgeonfishImage from "../assets/striated_surgeonfish_sprite.png";
import type { SpeciesRole } from "../types/simulationEntity";
import type { CoralAssets, AnimatedSprite } from "../types/spriteSheet";
import branching1 from "../assets/corals/branching_coral_1.png";
import branching2 from "../assets/corals/branching_coral_2.png";
import branching3 from "../assets/corals/branching_coral_3.png";
import massive1 from "../assets/corals/massive_coral_1.png";
import massive2 from "../assets/corals/massive_coral_2.png";
import massive3 from "../assets/corals/massive_coral_3.png";
import plate1 from "../assets/corals/plate_coral_1.png";
import plate2 from "../assets/corals/plate_coral_2.png";
import plate3 from "../assets/corals/plate_coral_3.png";
import branching1dead from "../assets/corals/branching_coral_dead_1.png";
import branching2dead from "../assets/corals/branching_coral_dead_2.png";
import branching3dead from "../assets/corals/branching_coral_dead_3.png";
import massive1dead from "../assets/corals/massive_coral_dead_1.png";
import massive2dead from "../assets/corals/massive_coral_dead_2.png";
import massive3dead from "../assets/corals/massive_coral_dead_3.png";
import plate1dead from "../assets/corals/plate_coral_dead_1.png";
import plate2dead from "../assets/corals/plate_coral_dead_2.png";
import plate3dead from "../assets/corals/plate_coral_dead_3.png";


export function useAssets() {

    //ref to store the spritesheet for each species role
    const assetsRef = useRef<Record<SpeciesRole, AnimatedSprite>>({
        apexPredator: {
            image: new Image(),
            frameWidth: 256,
            frameHeight: 256,
            frameCount: 25,
            columns: 5,
            rows: 5
        },

        turfBrusher: {
            image: new Image(),
            frameWidth: 256,
            frameHeight: 256,
            frameCount: 25,
            columns: 5,
            rows: 5
        },

        herbScraper: {
            image: new Image(),
            frameWidth: 256,
            frameHeight: 256,
            frameCount: 25,
            columns: 5,
            rows: 5
        },

        invertHunter: {
            image: new Image(),
            frameWidth: 256,
            frameHeight: 256,
            frameCount: 25,
            columns: 5,
            rows: 5
        },

        smallInvert: {
            image: new Image(),
            frameWidth: 256,
            frameHeight: 256,
            frameCount: 25,
            columns: 5,
            rows: 5

        }
    });

    const coralAssetsRef = useRef<CoralAssets>({
        branching: {
            healthy: [
                { image: new Image() },
                { image: new Image() },
                { image: new Image() }
            ],
            dead: [
                { image: new Image() },
                { image: new Image() },
                { image: new Image() }
            ]
        },
        massive: {
            healthy: [
                { image: new Image() },
                { image: new Image() },
                { image: new Image() }
            ],
            dead: [
                { image: new Image() },
                { image: new Image() },
                { image: new Image() }
            ]
        },
        plate: {
            healthy: [
                { image: new Image() },
                { image: new Image() },
                { image: new Image() }
            ],
            dead: [
                { image: new Image() },
                { image: new Image() },
                { image: new Image() }
            ]
        }
    });

    // Load images when component mounts
    useEffect(() => {
        assetsRef.current.apexPredator.image.src = blacktipReefSharkImage;
        assetsRef.current.turfBrusher.image.src = striatedSurgeonfishImage;
        assetsRef.current.herbScraper.image.src = bulletheadParrotfishImage;
        assetsRef.current.invertHunter.image.src = manybarGoatfishImage;
        assetsRef.current.smallInvert.image.src = shrimpImage;
        coralAssetsRef.current.branching.healthy[0].image.src = branching1;
        coralAssetsRef.current.branching.healthy[1].image.src = branching2;
        coralAssetsRef.current.branching.healthy[2].image.src = branching3;
        coralAssetsRef.current.massive.healthy[0].image.src = massive1;
        coralAssetsRef.current.massive.healthy[1].image.src = massive2;
        coralAssetsRef.current.massive.healthy[2].image.src = massive3;
        coralAssetsRef.current.plate.healthy[0].image.src = plate1;
        coralAssetsRef.current.plate.healthy[1].image.src = plate2;
        coralAssetsRef.current.plate.healthy[2].image.src = plate3;
        coralAssetsRef.current.branching.dead[0].image.src = branching1dead;
        coralAssetsRef.current.branching.dead[1].image.src = branching2dead;
        coralAssetsRef.current.branching.dead[2].image.src = branching3dead;
        coralAssetsRef.current.massive.dead[0].image.src = massive1dead;
        coralAssetsRef.current.massive.dead[1].image.src = massive2dead;
        coralAssetsRef.current.massive.dead[2].image.src = massive3dead;
        coralAssetsRef.current.plate.dead[0].image.src = plate1dead;
        coralAssetsRef.current.plate.dead[1].image.src = plate2dead;
        coralAssetsRef.current.plate.dead[2].image.src = plate3dead;

    }, []);

    return {
        fish: assetsRef.current,
        coral: coralAssetsRef.current
    };

};