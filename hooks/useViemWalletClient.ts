import { createWalletClient, custom, Hex } from "viem";
import { baseSepolia } from "viem/chains";
import { useWallets, useBaseAccountSdk } from "@privy-io/react-auth";
import { useMemo } from "react";

export const useViemWalletClient = () => {
  const { wallets } = useWallets();
  const { baseAccountSdk } = useBaseAccountSdk();

  // Find the embedded wallet (Privy wallet) - needed as the signer
  const embeddedWallet = useMemo(() => {
    return wallets.find((wallet) => wallet.walletClientType === "privy");
  }, [wallets]);

  // Find the Base Account (Sub Account)
  const baseAccount = useMemo(() => {
    return wallets.find((wallet) => wallet.walletClientType === "base_account");
  }, [wallets]);

  // Use baseAccount as the primary wallet, fallback to embeddedWallet
  const wallet = baseAccount || embeddedWallet;

  const getWalletClient = async () => {
    if (!wallet) {
      throw new Error("No wallet connected");
    }

    const walletProvider = await wallet.getEthereumProvider();

    // Check current chain ID
    const currentChainId = await walletProvider.request({
      method: "eth_chainId",
    });
    const baseChainId = `0x${baseSepolia.id.toString(16)}`;

    if (currentChainId !== baseChainId) {
      try {
        await walletProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: baseChainId }],
        });
      } catch (switchError: any) {
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
                rpcUrls: ["https://sepolia.base.org"],
                blockExplorerUrls: ["https://sepolia.basescan.org"],
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

  return {
    getWalletClient,
    wallet,
    embeddedWallet,
    baseAccount,
    baseAccountSdk,
    hasSubAccount: !!baseAccount && !!embeddedWallet,
  };
};
