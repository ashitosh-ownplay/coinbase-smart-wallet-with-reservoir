import { getClient, Execute } from "@reservoir0x/reservoir-sdk";
import { useAccount } from "wagmi";
import { createWalletClient, custom, http } from "viem";
import { sepolia } from "viem/chains";

export type ReservoirSellParams = {
  tokenAddress: string;
  wallet: any;
  tokenId: string;
};
const SALE_DURATION_SECONDS = 86400;

export const ReservoirSellButton = ({
  tokenAddress,
  tokenId,
  wallet,
}: ReservoirSellParams) => {
  const { chain, address } = useAccount();

  const client = createWalletClient({
    account: wallet.address,
    chain: sepolia,
    transport: http(),
  });

  const sellNFTReservoir = async () => {
    try {
      const expirationTime =
        Math.floor(new Date().getTime() / 1000) + SALE_DURATION_SECONDS;

      await getClient()
        ?.actions.listToken({
          listings: [
            {
              token: `${tokenAddress}:${tokenId}`,
              weiPrice: "700000000000000", // 0.0007 ETH
              // weiPrice: "300000", // 0.03 USDC
              // currency: usdcAddress[chainName],
              orderbook: "reservoir",
              orderKind: "seaport-v1.5",
              expirationTime: expirationTime.toString(),
              automatedRoyalties: true,
              options: { "seaport-v1.5": { useOffChainCancellation: true } },
            },
          ],
          chainId: chain?.id,
          // @ts-ignore
          wallet: client,
          onProgress: (steps: Execute["steps"]) => {
            console.log("sell steps", steps);
          },
        })
        .catch((e) => {
          console.log("error in listing: ", e);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      className="focus:shadow-outline-blue mt-5 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
      onClick={() => sellNFTReservoir()}
    >
      Sell Token (Reservoir)
    </button>
  );
};
