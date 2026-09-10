import blacktipReefSharkImage from "../assets/blacktip_reef_shark_sprite.png";
import bulletheadParrotfishImage from "../assets/bullethead_parrotfish_sprite.png";
import manybarGoatfishImage from "../assets/manybar_goatfish_sprite.png";
import shrimpImage from "../assets/shrimp_sprite.png";
import striatedSurgeonfishImage from "../assets/striated_surgeonfish_sprite.png";

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

function preloadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
        const image = new Image();

        image.onload = () => resolve();

        image.onerror = () => {
            console.error(`Failed to preload image: ${src}`);
            resolve();
        };

        image.src = src;
    });
}

const spriteSources = [
    blacktipReefSharkImage,
    bulletheadParrotfishImage,
    manybarGoatfishImage,
    shrimpImage,
    striatedSurgeonfishImage,

    branching1,
    branching2,
    branching3,

    massive1,
    massive2,
    massive3,

    plate1,
    plate2,
    plate3,

    branching1dead,
    branching2dead,
    branching3dead,

    massive1dead,
    massive2dead,
    massive3dead,

    plate1dead,
    plate2dead,
    plate3dead,
];

export async function preloadSpriteImages(
    onProgress?: (progress: number) => void
) {
    let loaded = 0;

    await Promise.all(
        spriteSources.map(async (src) => {
            await preloadImage(src);

            loaded++;

            onProgress?.(loaded / spriteSources.length);
        })
    );
}