import { viemPublicClient } from "../configs/viem";
import { LAVA_TOKEN_ABI } from "../constants/abis/lavaToken";
import { getContractAddress } from "../constants/addresses";

export type ContractData = {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
  owner: `0x${string}`;
  tradingEnabled: boolean;
  gameActive: boolean;
  paused: boolean;
  currentRound: bigint;
  lastBuyer: `0x${string}`;
  lastBuyTime: bigint;
  lastBuyAmount: bigint;
  currentFloor: bigint;
  treasuryBalance: bigint;
  totalBurned: bigint;
  buyTaxBps: bigint;
  sellTaxBps: bigint;
  rugTimer: bigint;
  pair: `0x${string}`;
  router: `0x${string}`;
  currentPrice: bigint;
  floorPrice: bigint;
  floorRate: bigint;
  minBuy: bigint;
};

export const getContractData = async (): Promise<ContractData | null> => {
  try {
    const [
      name,
      symbol,
      decimals,
      totalSupply,
      owner,
      tradingEnabled,
      gameActive,
      paused,
      currentRound,
      lastBuyer,
      lastBuyTime,
      lastBuyAmount,
      currentFloor,
      treasuryBalance,
      totalBurned,
      buyTaxBps,
      sellTaxBps,
      rugTimer,
      pair,
      router,
      currentPrice,
      floorPrice,
      floorRate,
      minBuy,
    ] = await Promise.all([
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "name",
      }) as Promise<string>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "symbol",
      }) as Promise<string>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "decimals",
      }) as Promise<number>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "totalSupply",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "owner",
      }) as Promise<`0x${string}`>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "tradingEnabled",
      }) as Promise<boolean>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "gameActive",
      }) as Promise<boolean>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "paused",
      }) as Promise<boolean>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "currentRound",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "lastBuyer",
      }) as Promise<`0x${string}`>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "lastBuyTime",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "lastBuyAmount",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "currentFloor",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "treasuryBalance",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "totalBurned",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "BUY_TAX_BPS",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "SELL_TAX_BPS",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "RUG_TIMER",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "pair",
      }) as Promise<`0x${string}`>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "router",
      }) as Promise<`0x${string}`>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "getCurrentPrice",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "getCurrentFloor",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "getFloorRate",
      }) as Promise<bigint>,
      viemPublicClient.readContract({
        address: getContractAddress("LAVA_TOKEN"),
        abi: LAVA_TOKEN_ABI,
        functionName: "getMinimumBuy",
      }) as Promise<bigint>,
    ] as const);

    return {
      name,
      symbol,
      decimals,
      totalSupply,
      owner,
      tradingEnabled,
      gameActive,
      paused,
      currentRound,
      lastBuyer,
      lastBuyTime,
      lastBuyAmount,
      currentFloor,
      treasuryBalance,
      totalBurned,
      buyTaxBps,
      sellTaxBps,
      rugTimer,
      pair,
      router,
      currentPrice,
      floorPrice,
      floorRate,
      minBuy,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
