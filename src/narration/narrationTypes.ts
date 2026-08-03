export type NarrationId =
    | "intro-0"
    | "intro-1"
    | "intro-2"
    | "intro-3"
    | "intro-4"
    | "intro-5"
    | "intro-6"
    | "intro-7"
    | "tutorial-0"
    | "tutorial-1"
    | "tutorial-2"
    | "tutorial-3"
    | "tutorial-4"
    | "tutorial-5"
    | "tutorial-6"
    | "tutorial-7"
    | "tutorial-8"
    | "tutorial-9"
    | "tutorial-10"
    | "tutorial-11"
    | "tutorial-12";


export type NarrationScript = {
    id: NarrationId;
    text: string;
    overlay: "full" | "simulation" | "slider" | "display" | "anomaly" | "none";
    advance: "auto" | "modal-close" | "slider";
    pauseAfter?: number;
};