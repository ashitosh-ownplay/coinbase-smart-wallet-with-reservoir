import { chainName, marketplaceSource, reservoirApiKey, reservoirChains } from "../configs/index";
import { createClient } from "@reservoir0x/reservoir-sdk";

export const initReservoirClient = () => {
    createClient({
        chains: [reservoirChains[chainName]],
        apiKey: reservoirApiKey,
        logLevel: 4,
        source: marketplaceSource,
    });
}
