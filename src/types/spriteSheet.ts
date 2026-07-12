//structure of sprite sheet data

export type AnimatedSprite = {
    image: HTMLImageElement;
    frameWidth: number;
    frameHeight: number;
    frameCount: number; //no. of frames in one sheet
    columns: number;
    rows: number;
};

export type StaticSprite = {
    image: HTMLImageElement;
};

type CoralStateSprites = {
    healthy: StaticSprite[];
    dead: StaticSprite[];
};

export type CoralAssets = {
    branching: CoralStateSprites;
    massive: CoralStateSprites;
    plate: CoralStateSprites;
};