"use client";

import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useWriteContract } from "wagmi";
import Connect from "./components/connect";
import { ReservoirSellButton } from "./components/reservoir/ReservoirSellButton";
import { initReservoirClient } from "./utils/reservoir";

const abi = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "to", type: "address" }],
    name: "safeMint",
    outputs: [],
  },
];

function App() {
  const account = useAccount();
  const { writeContract } = useWriteContract();
  const { disconnect } = useDisconnect();

  initReservoirClient();

  if (account.status !== "connected") {
    return <Connect />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 shadow-2xl rounded-lg">
        {/* <button
          type="button"
          className="mt-5 w-full py-2 bg-gray-600 text-white font-bold rounded transition duration-300 ease-in-out transform hover:scale-105 mb-3"
          onClick={() =>
            writeContract({
              // NOTE: Prepared is needed as by default writeContract simulates
              // first and the delayed call will cause some browsers to block the popup
              __mode: "prepared",
              address: "0x119Ea671030FBf79AB93b436D2E20af6ea469a19",
              abi,
              functionName: "safeMint",
              args: [account.address],
            })
          }
        >
          mint
        </button> */}
        <ReservoirSellButton
          wallet={account}
          tokenAddress={"0x9dc4Dc13d825Be567EC280D7c88B77294A1cf9ED"}
          tokenId={"3"}
        />
        {account.isConnected ? (
          <button onClick={() => disconnect()}>disconnect</button>
        ) : (
          <Connect />
        )}
      </div>
    </div>
  );
}

export default App;
