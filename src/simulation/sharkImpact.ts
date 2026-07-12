import type { EcoStatus, ReefEcoStatus, Status } from "../types/ecoStatus";

const sharkImpact: Record<EcoStatus, string> = {
    "Endangered":
        "The Blacktip Reef Shark population is endangered! With too few sharks remaining, predation pressure on reef fishes is greatly reduced, allowing prey populations to grow unchecked. As herbivorous and mid-level predator populations become increasingly imbalanced, the reef food web begins to lose its natural structure. If this trend continues, widespread ecological imbalance may occur, affecting coral health, biodiversity, and the long-term stability of the ecosystem.",

    "Declining":
        "Blacktip Reef Shark populations are declining! Reduced shark abundance weakens top-down regulation of the food web, allowing prey populations to gradually increase beyond their healthy levels. Although the ecosystem remains functional, the balance between predators and prey begins to shift. If this trend continues, the reef ecosystem may become increasingly unstable as trophic imbalances develop.",

    "Optimal":
        "Blacktip Reef Shark populations are at their natural equilibrium! Shark abundance is ideal for maintaining healthy predator-prey relationships throughout the reef ecosystem. Herbivorous fishes, prey hunters, and invertebrates all remain close to their natural population levels, allowing coral reefs to flourish. If this trend continues, the ecosystem will remain balanced, diverse, and resilient!",

    "Stable":
        "Blacktip Reef Shark populations are stable! Shark abundance remains sufficient to regulate prey populations while maintaining a healthy food-web structure. Minor fluctuations in species populations are naturally controlled, allowing ecological processes to continue with minimal disruption. If this trend continues, the ecosystem will remain relatively balanced and healthy.",

    "Slightly Elevated":
        "Blacktip Reef Shark populations are slightly elevated! Predation pressure on reef fishes is slightly higher than normal, causing small reductions in several prey populations. While the ecosystem remains largely stable, continued increases in shark abundance may begin to reduce herbivorous fish populations, allowing algae to accumulate on coral reefs. If this trend continues, ecological balance may gradually shift.",

    "Elevated":
        "Blacktip Reef Shark populations are elevated! Increased predation significantly reduces populations of reef fishes, particularly herbivorous species that help control algae. As algae become less effectively grazed, coral reefs may begin to experience declining health despite the presence of a strong predator population. If this trend continues, biodiversity and reef resilience may gradually decrease.",

    "Overpopulated":
        "The Blacktip Reef Shark population is overpopulated! Extremely high shark abundance places excessive predation pressure on many reef fishes, causing several prey populations to decline dramatically. As herbivorous fishes become scarce, algae can rapidly overgrow coral reefs, leading to habitat degradation and reduced biodiversity. If this trend continues, the ecosystem may become severely unbalanced despite the abundance of its apex predator."
};

const sharkImpactGoatfish: Record<EcoStatus, string> = {
    "Endangered":
        "The Manybar Goatfishes are endangered! Extremely high shark abundance greatly increases predation on the goatfishes, causing their population to become endangered. If this trend continues, Manybar Goatfishes' prey (Cleaner Shrimps) will increase in population due to reduced predation, potentially causing Shrimp overpopulation.",

    "Declining":
        "Manybar Goatfish populations are declining! High shark abundance leads to increased predation, causing the goatfish population to fall below its healthy level. If this trend continues, fewer goatfishes will be available to regulate the populations of their prey (Cleaner Shrimps), leading to an increase in Cleaner Shrimp populations.",

    "Optimal":
        "Manybar Goatfish populations are at its natural equilibrium! Shark abundance is at a healthy level, allowing Manybar Goatfish populations to stay optimal. The goatfishes can provide effective control over their prey (Cleaner Shrimps) while supporting higher predators (Sharks). If this trend continues, the ecosystem will remain balanced and healthy!",

    "Stable":
        "The Manybar Goatfish populations are stable! Shark abundance is still at a reasonable level, allowing Manybar Goatfishes to maintain a stable population. The goatfishes can continue to fulfil their ecological role with minimal disruption. If this trend continues, the ecosystem will remain relatively balanced and healthy.",

    "Slightly Elevated":
        "Manybar Goatfish populations are slightly elevated! Shark abundance is slightly lower than normal, leading to a slight reduction in predation which allows goatfish populations to increase. Ecological impacts remain relatively minor at this stage, but if this trend continues, the ecosystem may slowly move toward an imbalanced state with increasing fish populations over time.",

    "Elevated":
        "Manybar Goatfish populations are elevated! Low shark abundance leads to reduced predation pressure, allowing goatfish populations to increase. If this trend continues, goatfish populations may become overabundant due to the lack of predation, affecting the balance of the ecosystem.",

    "Overpopulated":
        "The Manybar Goatfishes are overpopulated! Extremely low shark abundance has removed much of the natural predation on goatfishes, causing their populations to explode. If this trend continues, the overabundant goatfish populations could severely reduce their prey (Cleaner Shrimps) populations, disrupting the ecosystem and food-web balance."
};

const sharkImpactSurgeonfish: Record<EcoStatus, string> = {
    "Endangered":
        "The Striated Surgeonfishes are endangered! Extremely high shark abundance greatly increases predation on surgeonfishes, causing their population to become endangered. With fewer surgeonfishes grazing on turf algae, algae can rapidly overgrow the reef and compete with corals for space and sunlight. If this trend continues, coral health may decline significantly.",

    "Declining":
        "Striated Surgeonfish populations are declining! High shark abundance increases predation pressure, reducing surgeonfish numbers below healthy levels. As fewer surgeonfishes graze on algae, algal growth may begin to outcompete corals. If this trend continues, coral reefs may gradually lose resilience and biodiversity.",

    "Optimal":
        "Striated Surgeonfish populations are at their natural equilibrium! Shark abundance is at a healthy level, allowing surgeonfish populations to remain stable while effectively controlling turf algae. This helps prevent algal overgrowth and supports healthy coral reefs. If this trend continues, the ecosystem will remain balanced and healthy!",

    "Stable":
        "Striated Surgeonfish populations are stable! Shark abundance remains at a reasonable level, allowing surgeonfishes to continue grazing on algae while maintaining a healthy population. Coral reefs continue to benefit from effective algae control. If this trend continues, the ecosystem will remain relatively balanced and healthy.",

    "Slightly Elevated":
        "Striated Surgeonfish populations are slightly elevated! Shark abundance is slightly lower than normal, reducing predation and allowing surgeonfish populations to increase. Increased grazing helps keep algae under control, although ecological impacts remain relatively minor at this stage. If this trend continues, the ecosystem may slowly shift toward an imbalance due to increasing herbivore populations.",

    "Elevated":
        "Striated Surgeonfish populations are elevated! Low shark abundance reduces predation pressure, allowing surgeonfish populations to increase noticeably. Excessive grazing may alter natural algal communities and create competition with other herbivorous fishes. If this trend continues, the reef food web may become increasingly imbalanced.",

    "Overpopulated":
        "The Striated Surgeonfishes are overpopulated! Extremely low shark abundance has removed much of the natural predation on surgeonfishes, allowing their population to grow excessively. If this trend continues, intense grazing pressure may alter reef algal communities and disrupt the natural balance among herbivorous species."
};

const sharkImpactParrotfish: Record<EcoStatus, string> = {
    "Endangered":
        "The Bullethead Parrotfishes are endangered! Extremely high shark abundance greatly increases predation on parrotfishes, causing their population to become endangered. With fewer parrotfishes scraping algae from reef surfaces, algae can rapidly overgrow corals and reduce reef recovery. If this trend continues, coral health may deteriorate significantly.",

    "Declining":
        "Bullethead Parrotfish populations are declining! High shark abundance increases predation pressure, reducing parrotfish numbers below healthy levels. Reduced grazing allows algae to accumulate on coral surfaces, limiting coral growth. If this trend continues, reef ecosystems may gradually become less resilient.",

    "Optimal":
        "Bullethead Parrotfish populations are at their natural equilibrium! Shark abundance is at a healthy level, allowing parrotfish populations to effectively control algae while contributing to reef maintenance and sand production. If this trend continues, the ecosystem will remain balanced and healthy!",

    "Stable":
        "Bullethead Parrotfish populations are stable! Shark abundance remains at a reasonable level, allowing parrotfishes to continue performing their important ecological role with minimal disruption. Coral reefs continue to benefit from regular algae removal. If this trend continues, the ecosystem will remain relatively balanced and healthy.",

    "Slightly Elevated":
        "Bullethead Parrotfish populations are slightly elevated! Shark abundance is slightly lower than normal, allowing parrotfish populations to increase slightly due to reduced predation. Additional grazing remains beneficial for the reef, although long-term population growth could gradually disturb ecosystem balance.",

    "Elevated":
        "Bullethead Parrotfish populations are elevated! Low shark abundance has reduced predation pressure, allowing parrotfish populations to increase substantially. Increased grazing may benefit the reef, but excessive grazing may cause bioerosion. Along with competition from other grazers, reef structure may erode or get altered. If this trend continues, the corals may struggle to maintain their growth and resilience.",

    "Overpopulated":
        "The Bullethead Parrotfishes are overpopulated! Extremely low shark abundance has greatly reduced natural predation, allowing parrotfish populations to grow unchecked. If this trend continues, excessive grazing and bioerosion may alter reef habitats and disrupt the balance between coral growth and erosion."
};

const sharkImpactShrimp: Record<EcoStatus, string> = {
    "Endangered":
        "Cleaner Shrimp populations are endangered! Extremely low shark abundance allows Manybar Goatfish populations to become overpopulated. The increased number of goatfishes places heavy predation pressure on Cleaner Shrimps, causing their population to fall to endangered levels. If this trend continues, cleaning stations may disappear, reducing parasite removal for reef fishes and affecting overall reef health.",

    "Declining":
        "Cleaner Shrimp populations are declining! Low shark abundance allows Manybar Goatfish populations to increase, resulting in greater predation on Cleaner Shrimps. As shrimp numbers decrease, fewer cleaning interactions occur between shrimps and reef fishes. If this trend continues, fish health may gradually decline as parasites become more common.",

    "Optimal":
        "Cleaner Shrimp populations are at their natural equilibrium! Shark abundance keeps Manybar Goatfish populations at healthy levels, preventing excessive predation on Cleaner Shrimps. This allows shrimps to maintain active cleaning stations that remove parasites from reef fishes. If this trend continues, the ecosystem will remain balanced and healthy!",

    "Stable":
        "Cleaner Shrimp populations are stable! Shark abundance remains at a reasonable level, allowing Manybar Goatfish populations to stay balanced while maintaining sustainable predation on Cleaner Shrimps. Cleaning services continue with little disruption, supporting healthy reef fish populations. If this trend continues, the ecosystem will remain relatively balanced and healthy.",

    "Slightly Elevated":
        "Cleaner Shrimp populations are slightly elevated! Shark abundance is slightly higher than normal, causing a small decline in Manybar Goatfish populations. With fewer goatfishes feeding on Cleaner Shrimps, shrimp populations begin to increase. Ecological impacts remain minor at this stage, but if this trend continues, shrimp populations may continue to grow beyond their natural balance.",

    "Elevated":
        "Cleaner Shrimp populations are elevated! High shark abundance reduces Manybar Goatfish populations, lowering predation pressure on Cleaner Shrimps. As shrimp populations increase, cleaning stations become more common throughout the reef. If this trend continues, shrimp populations may become excessively abundant, altering the natural balance of the ecosystem.",

    "Overpopulated":
        "Cleaner Shrimp populations are overpopulated! Extremely high shark abundance has greatly reduced Manybar Goatfish populations, leaving few predators to control Cleaner Shrimp numbers. As a result, shrimp populations grow rapidly. If this trend continues, the reef food web may become increasingly imbalanced as predator-prey relationships are disrupted."
};

const sharkImpactReefBuilder: Record<ReefEcoStatus, string> = {
    "Optimal":
        "The Reef Builders are in optimal condition! Shark abundance maintains a healthy balance throughout the food web, allowing Striated Surgeonfishes and Bullethead Parrotfishes to effectively control algae while Cleaner Shrimps continue supporting healthy reef fish populations. With algae kept at low levels, corals receive sufficient space and sunlight to thrive. If this trend continues, the reef ecosystem will remain healthy and resilient.",

    "Stable":
        "Reef Builder health is stable! Herbivorous fish populations remain sufficient to control most algal growth, while Cleaner Shrimps continue providing cleaning services that support overall reef health. Corals are able to grow with minimal stress despite minor fluctuations in algae. If this trend continues, the reef ecosystem will remain relatively balanced and healthy.",

    "Slightly Declining":
        "Reef Builder health is slightly declining! Increasing shark abundance has begun reducing populations of Striated Surgeonfishes and Bullethead Parrotfishes, allowing algae to spread more easily across the reef. Although Cleaner Shrimps continue supporting reef fishes, their positive effects cannot fully compensate for increasing algal competition. If this trend continues, coral health may continue to decline as algae occupy more space on the reef.",

    "Declining":
        "Reef Builder health is declining! High shark abundance has substantially reduced herbivorous fish populations, allowing algae to grow unchecked and compete with corals for space and sunlight. Cleaner Shrimps continue contributing to reef health, but their influence is relatively minor compared to the loss of algae grazers. If this trend continues, coral cover may decrease significantly, reducing habitat availability for many reef organisms.",

    "Endangered":
        "The Reef Builders are endangered! Extremely high shark abundance has greatly reduced Striated Surgeonfish and Bullethead Parrotfish populations, resulting in severe algal overgrowth across the reef. Although Cleaner Shrimps continue supporting reef fishes, their contribution is insufficient to offset the loss of herbivorous grazers. If this trend continues, extensive coral mortality may occur, leading to habitat loss, declining biodiversity, and a severely degraded reef ecosystem."
};


const sharkImpactMessages: Record<string, Partial<Record<Status, string>>> = {
    "Blacktip Reef Shark": sharkImpact,
    "Manybar Goatfish": sharkImpactGoatfish,
    "Striated Surgeonfish": sharkImpactSurgeonfish,
    "Bullethead Parrotfish": sharkImpactParrotfish,
    "Cleaner Shrimp": sharkImpactShrimp,
    "Reef Builder": sharkImpactReefBuilder
};

export function getSharkImpactMessage(species: string, status: Status): string {
    return sharkImpactMessages[species]?.[status] ?? ""; //return message if it exists, otherwise return an empty string
};