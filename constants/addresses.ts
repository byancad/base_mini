import { Hex } from "viem";

export const ADDRESSES: Record<number, Record<string, Hex>> = {
  //chain id => contract name => addres
  84532: {
    LAVA_TOKEN: "0x514C8e247D04E4E453c9f9e0DbAEaF3597232310",
    UNISWAP_ROUTER: "0x1689E7B1F10000AE47eBfE339a4f69dECd19F602",
    ADMIN_ADDRESS: "0x6f4ef18b61e4ce6fb78095023c7d94256d893789",
  },
};

export const getContractAddress = (
  contract: string,
  chainId: number = 84532
) => {
  const address = ADDRESSES[chainId][contract];
  if (!address) throw new Error("Contract address or Chain ID missing!");
  return address;
};
