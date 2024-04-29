import { Execute, getClient } from "@reservoir0x/reservoir-sdk";
import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";

export type ReservoirCancelOrderParams = {
  orderId: string;
  wallet?: any;
};

export const ReservoirCancelOrderButton = ({
  orderId,
  wallet,
}: ReservoirCancelOrderParams) => {
  const cancelOrder = async () => {
    const { chain, address } = useAccount();

    const client = createWalletClient({
      account: address,
      chain: sepolia,
      transport: http(),
    });

    try {
      await getClient()?.actions.cancelOrder({
        ids: [orderId],
        chainId: chain?.id,
        // @ts-ignore
        wallet: client,
        onProgress: (steps: Execute["steps"]) => {
          console.log("cancel steps", steps);
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      className="focus:shadow-outline-blue rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
      onClick={() => cancelOrder()}
    >
      Cancel Order
    </button>
  );
};
