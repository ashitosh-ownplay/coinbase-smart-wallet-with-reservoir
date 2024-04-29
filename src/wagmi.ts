import { http, createConfig } from "wagmi";
import { baseSepolia, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const config = createConfig({
	chains: [sepolia],
	connectors: [
		coinbaseWallet({
			appName: "A Cool App",
			appChainIds: [sepolia.id],
		}),
	],
	ssr: true,
	transports: {
		[sepolia.id]: http(),
	},
});

declare module "wagmi" {
	interface Register {
		config: typeof config;
	}
}
