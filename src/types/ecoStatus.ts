export type EcoStatus =
    "Endangered" | "Declining" | "Optimal" | "Stable" | "Slightly Elevated" | "Elevated" | "Overpopulated";

export type ReefEcoStatus =
    "Optimal" | "Stable" | "Slightly Declining" | "Declining" | "Endangered";

export type Status = EcoStatus | ReefEcoStatus;