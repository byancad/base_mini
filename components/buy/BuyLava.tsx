"use client";
import React, { useEffect, useState, useCallback } from "react";
import { formatEther, parseEther, formatUnits } from "viem";
import { useViemWalletClient } from "@/hooks/useViemWalletClient";
import { viemPublicClient } from "@/configs/viem";
import { getContractAddress } from "@/constants/addresses";
import { UNISWAP_ROUTER_ABI } from "@/constants/abis/uniswapRouter";
import { usePrivy } from "@privy-io/react-auth";

export default function BuyLava() {
  const { authenticated } = usePrivy();
  const { getWalletClient, wallet } = useViemWalletClient();
  const [ethAmount, setEthAmount] = useState("");
  const [estimatedLava, setEstimatedLava] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [wethAddress, setWethAddress] = useState<`0x${string}` | null>(null);

  // Fetch WETH address from router
  useEffect(() => {
    const fetchWeth = async () => {
      try {
        const weth = (await viemPublicClient.readContract({
          address: getContractAddress("UNISWAP_ROUTER"),
          abi: UNISWAP_ROUTER_ABI,
          functionName: "WETH",
        })) as `0x${string}`;
        setWethAddress(weth);
      } catch (err) {
        console.error("Failed to fetch WETH address:", err);
      }
    };
    fetchWeth();
  }, []);

  // Estimate output LAVA tokens
  const estimateOutput = useCallback(async () => {
    if (!ethAmount || !wethAddress || parseFloat(ethAmount) <= 0) {
      setEstimatedLava(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const amountIn = parseEther(ethAmount);
      const path = [wethAddress, getContractAddress("LAVA_TOKEN")];

      const amounts = (await viemPublicClient.readContract({
        address: getContractAddress("UNISWAP_ROUTER"),
        abi: UNISWAP_ROUTER_ABI,
        functionName: "getAmountsOut",
        args: [amountIn, path],
      })) as bigint[];

      // amounts[1] is the output token amount
      setEstimatedLava(formatUnits(amounts[1], 18));
    } catch (err: any) {
      console.error("Estimation error:", err);
      setEstimatedLava(null);
      setError("Unable to estimate output");
    } finally {
      setIsLoading(false);
    }
  }, [ethAmount, wethAddress]);

  // Debounce estimation
  useEffect(() => {
    const timer = setTimeout(() => {
      estimateOutput();
    }, 500);
    return () => clearTimeout(timer);
  }, [estimateOutput]);

  // Buy LAVA tokens
  const handleBuy = async () => {
    if (!authenticated || !wallet || !wethAddress) {
      setError("Please connect your wallet first");
      return;
    }

    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      setError("Please enter a valid ETH amount");
      return;
    }

    setIsBuying(true);
    setError(null);
    setTxHash(null);

    try {
      const walletClient = await getWalletClient();
      const amountIn = parseEther(ethAmount);
      const path = [wethAddress, getContractAddress("LAVA_TOKEN")];

      // Set deadline to 20 minutes from now
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200);

      // Set minimum output to 0 for simplicity (in production, use slippage tolerance)
      const amountOutMin = BigInt(0);

      const hash = await walletClient.writeContract({
        address: getContractAddress("UNISWAP_ROUTER"),
        abi: UNISWAP_ROUTER_ABI,
        functionName: "swapExactETHForTokens",
        args: [amountOutMin, path, wallet.address as `0x${string}`, deadline],
        value: amountIn,
      });

      setTxHash(hash);

      // Wait for transaction confirmation
      await viemPublicClient.waitForTransactionReceipt({ hash });

      setEthAmount("");
      setEstimatedLava(null);
    } catch (err: any) {
      console.error("Buy error:", err);
      setError(err.shortMessage || err.message || "Transaction failed");
    } finally {
      setIsBuying(false);
    }
  };

  if (!authenticated) {
    return (
      <div style={styles.container}>
        <p style={styles.message}>Connect your wallet to buy LAVA</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🌋 Buy LAVA</h2>

      <div style={styles.inputGroup}>
        <label style={styles.label}>ETH Amount</label>
        <input
          type="number"
          placeholder="0.01"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
          style={styles.input}
          step="0.001"
          min="0"
          disabled={isBuying}
        />
      </div>

      {isLoading && <p style={styles.estimating}>Estimating...</p>}

      {estimatedLava && !isLoading && (
        <div style={styles.estimate}>
          <span style={styles.estimateLabel}>Estimated LAVA:</span>
          <span style={styles.estimateValue}>
            {parseFloat(estimatedLava).toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}
          </span>
        </div>
      )}

      <button
        onClick={handleBuy}
        disabled={isBuying || !ethAmount || parseFloat(ethAmount) <= 0}
        style={{
          ...styles.buyButton,
          opacity:
            isBuying || !ethAmount || parseFloat(ethAmount) <= 0 ? 0.6 : 1,
          cursor:
            isBuying || !ethAmount || parseFloat(ethAmount) <= 0
              ? "not-allowed"
              : "pointer",
        }}
      >
        {isBuying ? "Buying..." : "Buy LAVA 🔥"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {txHash && (
        <div style={styles.success}>
          <p>Transaction submitted!</p>
          <a
            href={`https://sepolia.basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.txLink}
          >
            View on BaseScan ↗
          </a>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "24px",
    borderRadius: "16px",
    background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
    border: "1px solid #333",
    maxWidth: "360px",
    margin: "20px auto",
  },
  title: {
    margin: "0 0 20px 0",
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#fff",
  },
  inputGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#aaa",
    fontSize: "0.875rem",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #444",
    background: "#0d1117",
    color: "#fff",
    fontSize: "1.125rem",
    outline: "none",
    boxSizing: "border-box",
  },
  estimate: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    background: "rgba(255, 107, 53, 0.1)",
    borderRadius: "12px",
    marginBottom: "16px",
  },
  estimateLabel: {
    color: "#aaa",
    fontSize: "0.875rem",
  },
  estimateValue: {
    color: "#ff6b35",
    fontSize: "1.125rem",
    fontWeight: "600",
  },
  estimating: {
    color: "#888",
    textAlign: "center",
    margin: "12px 0",
  },
  buyButton: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #ff6b35 0%, #f7931a 100%)",
    color: "#fff",
    fontSize: "1.125rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  error: {
    color: "#ff4757",
    textAlign: "center",
    marginTop: "12px",
    fontSize: "0.875rem",
  },
  success: {
    marginTop: "16px",
    padding: "12px",
    background: "rgba(46, 213, 115, 0.1)",
    borderRadius: "12px",
    textAlign: "center",
  },
  txLink: {
    color: "#2ed573",
    textDecoration: "none",
    fontWeight: "500",
  },
  message: {
    color: "#888",
    textAlign: "center",
    margin: 0,
  },
};
