import { createWalletClient, custom, Hex } from "viem";
import { baseSepolia } from "viem/chains";
import { useWallets } from "@privy-io/react-auth";
import { useMemo } from "react";

export const useViemWalletClient = () => {
  const { wallets } = useWallets();
  const wallet = useMemo(() => {
    return wallets[0];
  }, [wallets]);

  const getWalletClient = async () => {
    if (!wallet) {
      throw new Error("No wallet connected");
    }

    const walletProvider = await wallet.getEthereumProvider();

    // Check current chain ID
    const currentChainId = await walletProvider.request({
      method: "eth_chainId",
    });
    const baseChainId = `0x${baseSepolia.id.toString(16)}`; // Convert to hex format

    if (currentChainId !== baseChainId) {
      // Request chain switch
      try {
        await walletProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: baseChainId }],
        });
      } catch (switchError: any) {
        // If the chain hasn't been added to the wallet, add it
        if (switchError.code === 4902) {
          await walletProvider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: baseChainId,
                chainName: "Base Sepolia",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://mainnet.base.org"],
                blockExplorerUrls: ["https://basescan.org"],
              },
            ],
          });
        } else {
          throw switchError;
        }
      }
    }

    const walletClient = createWalletClient({
      account: wallet.address as Hex,
      chain: baseSepolia,
      transport: custom(walletProvider),
    });

    return walletClient;
  };

  return { getWalletClient, wallet };
};
