import { ReservoirChain } from "@reservoir0x/reservoir-sdk";
// import {
//   Chain,
//   anvil,
//   arbitrum,
//   arbitrumNova,
//   arbitrumSepolia,
//   avalanche,
//   avalancheFuji,
//   base,
//   baseSepolia,
//   ethereum,
//   optimism,
//   optimismSepolia,
//   polygon,
//   polygonAmoy,
//   polygonMumbai,
//   sepolia,
//   zora,
//   zoraSepolia,
// } from "thirdweb/chains";

export const reservoirApiKey =
  process.env.NEXT_PUBLIC_RESERVOIR_API_KEY ||
  "24a08690-2d5b-5014-8ab0-98ccb2e15483";

export const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "sepolia";
// export const chains: Record<string, Chain> = {
//   anvil: anvil,
//   arbitrumNova: arbitrumNova,
//   arbitrumSepolia: arbitrumSepolia,
//   arbitrum: arbitrum,
//   avalancheFuji: avalancheFuji,
//   avalanche: avalanche,
//   baseSepolia: baseSepolia,
//   base: base,
//   ethereum: ethereum,
//   optimismSepolia: optimismSepolia,
//   optimism: optimism,
//   polgonAmoy: polygonAmoy,
//   polygon: polygon,
//   sepolia: sepolia,
//   zoraSepolia: zoraSepolia,
//   zora: zora,
// };

export const usdcAddress: Record<string, string> = {
  polgonAmoy: "",
  sepolia: "0x14196F08a4Fa0B66B7331bC40dd6bCd8A1dEeA9F",
  arbitrumNova: "0x750ba8b76187092B0D1E87E28daaf484d1b5273b",
  base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
};

// For reservoir
// Reservoir supported chains --> https://docs.reservoir.tools/reference/supported-chains
export const reservoirBaseUri: Record<string, string> = {
  polgonAmoy: "https://api-amoy.reservoir.tools/",
  sepolia: "https://api-sepolia.reservoir.tools/",
  arbitrumNova: "https://api-arbitrum-nova.reservoir.tools/",
  base: "https://api-base.reservoir.tools/",
};

export const reservoirChains: Record<string, ReservoirChain> = {
  polygonMumbai: {
    id: 80002,
    name: "Polygon Amoy",
    baseApiUrl: reservoirBaseUri["polygonAmoy"],
    active: true,
  },
  sepolia: {
    id: 11155111,
    name: "Ethereum Sepolia",
    baseApiUrl: reservoirBaseUri["sepolia"],
    active: true,
  },
  arbitrumNova: {
    id: 42170,
    name: "Arbitrum Nova",
    baseApiUrl: reservoirBaseUri["arbitrumNova"],
    active: true,
  },
  base: {
    id: 8453,
    name: "Base",
    baseApiUrl: reservoirBaseUri["base"],
    active: true,
  },
};

export const SALE_DURATION_SECONDS = 86400; // One week in seconds
export const marketplaceSource = "mint.collection.test";
export const royaltyRecipient = "0x8adaD901940432491FD6d251bE7B627a8c3BC7d6";
export const royaltyBps = "500"; // 5%
export const primarySaleRecipient =
  "0x8adaD901940432491FD6d251bE7B627a8c3BC7d6";
export const signatureValidityPeriod = 86400; // day in seconds

export const collectionContractAddress =
  "0x9dc4Dc13d825Be567EC280D7c88B77294A1cf9ED";
