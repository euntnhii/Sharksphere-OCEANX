//store list of narration parts and other info like overlay mode

import type { NarrationScript } from "./narrationTypes";

export const narrationScripts: NarrationScript[] = [
    {
        id: "intro-0",
        text: "Welcome, fellow scientists, to Mission 2!",
        overlay: "full",
        advance: "auto"
    },
    {
        id: "intro-1",
        text: "In this mission, we will explore how shark populations affect the ecosystem.",
        overlay: "full",
        advance: "auto"
    },
    {
        id: "intro-2",
        text: "Having accurate shark population records help us better predict ecosystem changes, so that we can better protect the balance of marine ecosystems.",
        overlay: "full",
        advance: "auto"
    },
    {
        id: "intro-3",
        text: "But have you ever wondered, what happens if shark populations change?",
        overlay: "full",
        advance: "auto"
    },
    {
        id: "intro-4",
        text: "Shark populations are declining worldwide, and this can have serious consequences on ecosystems.",
        overlay: "full",
        advance: "auto"
    },
    {
        id: "intro-5",
        text: "Marine scientists use ecosystem models to study how changes in one species affect the entire reef.",
        overlay: "full",
        advance: "auto"
    },
    {
        id: "intro-6",
        text: "Now, let's explore how shark population changes can affect the rest of the ocean ecosystem!",
        overlay: "full",
        advance: "auto",
        pauseAfter: 300
    },
    {
        id: "tutorial-0",
        text: "This is our ecosystem model, which will reflect changes in any fish populations or coral reef builder states.", //remove overlay for simulation part of the screen
        overlay: "simulation",
        advance: "auto",
    },
    {
        id: "tutorial-1",
        text: "Click on any of the fishes or coral reefs to find out more about them!",
        overlay: "simulation",
        advance: "modal-close",
        pauseAfter: 800
    },
    {
        id: "tutorial-2",
        text: "This slider changes the shark population in the ecosystem model. Try moving it, and see how the ecosystem model changes!", //remove overlay for slider part of the screen
        overlay: "slider",
        advance: "slider",
        pauseAfter: 2800
    },
    {
        id: "tutorial-3",
        text: "This panel displays the list of species inside the ecosystem model, along with their population counts.", //remove overlay for display panel part of the screen (put back overlay for simulation and slider parts)
        overlay: "display",
        advance: "auto"
    },
    {
        id: "tutorial-4",
        text: "The different blinking colours represent different population health levels of each species. Red: Unhealthy, Yellow: Warning, Green: Healthy.",
        overlay: "display",
        advance: "auto"
    },
    {
        id: "tutorial-5",
        text: "Click on any of the species' names to find out more!",
        overlay: "display",
        advance: "modal-close",
        pauseAfter: 800
    },
    {
        id: "tutorial-6",
        text: "This panel displays the anomaly score of the ecosystem. A higher anomaly score means that the ecosystem is more imbalanced.", //remove overlay for anomaly score part (put back overlay for display panel)
        overlay: "anomaly",
        advance: "auto",
        pauseAfter: 800
    },
    {
        id: "tutorial-7",
        text: "Alright, fellow scientist. Are you familiar with the simulation?",
        overlay: "full",
        advance: "auto"
    },
    {
        id: "tutorial-8",
        text: "You will now be given 2 minutes to explore the simulation.",
        overlay: "full",
        advance: "auto"
    },
    {
        id: "tutorial-9",
        text: "Do explore as much as you can! Adjust the shark population slider and see how the ecosystem changes,",
        overlay: "full",
        advance: "auto"
    },
    {
        id: "tutorial-10",
        text: "and click on any of the fishes or coral reefs to learn more about the marine life in the simulation.",
        overlay: "full",
        advance: "auto"
    },
    {
        id: "tutorial-11",
        text: "Let's go!!",
        overlay: "none",
        advance: "auto"
    }

];