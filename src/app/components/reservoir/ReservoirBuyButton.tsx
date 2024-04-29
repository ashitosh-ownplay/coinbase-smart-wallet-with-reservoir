import { Execute, getClient } from "@reservoir0x/reservoir-sdk";
import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";

export type ReservoirBuyParams = {
  orderId: string;
  wallet?: any; // Wallet;
};

export const ReservoirBuyButton = ({ orderId, wallet }: ReservoirBuyParams) => {
  const buyNFTReservoir = async () => {
    const { chain, address } = useAccount();

    const client = createWalletClient({
      account: address,
      chain: sepolia,
      transport: http(),
    });

    try {
      await getClient()?.actions.buyToken({
        items: [
          {
            orderId: orderId,
            quantity: 1,
            fillType: "trade",
          },
        ],
        // options: {
        //   skipBalanceCheck: true,
        //   currency: usdcAddress[chainName],
        // },
        chainId: chain?.id,
        // @ts-ignore
        wallet: client,
        onProgress: (steps: Execute["steps"]) => {
          console.log("buy steps", steps);
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      className="focus:shadow-outline-blue rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
      onClick={() => buyNFTReservoir()}
    >
      Buy NFT
    </button>
  );
};
