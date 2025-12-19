import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";

export const viemPublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.NEXT_PUBLIC_ALCHEMY_TRANSPORT_URL),
});
