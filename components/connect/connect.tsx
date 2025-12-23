"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import React, { useMemo } from "react";

export default function Connect() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();

  // Check if user has a Base Account (Sub Account)
  const baseAccount = useMemo(() => {
    return wallets.find((wallet) => wallet.walletClientType === "base_account");
  }, [wallets]);

  const checkLogin = () => {
    login();
  };

  // Truncate address for display
  const truncateAddress = (address: string | undefined) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // If user has a Base Account, they're already authenticated via Farcaster
  // if (baseAccount) {
  //   return (
  //     <>
  //       <p>Connected via Base Account</p>
  //       <p>{baseAccount.address}</p>
  //     </>
  //   );
  // }

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    borderRadius: "12px",
    border: "none",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const loginButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "#6649AE",
    color: "white",
  };

  const logoutButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "rgba(102, 73, 174, 0.1)",
    color: "#6649AE",
    border: "1px solid #6649AE",
  };

  return (
    <>
      {ready && authenticated ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 12px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6649AE 0%, #CBBEFF 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "14px" }}>👤</span>
            </div>
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "13px",
                color: "#333",
                fontWeight: 500,
              }}
            >
              {truncateAddress(user?.wallet?.address?.toString())}
            </span>
          </div>
          <button
            onClick={logout}
            style={logoutButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#6649AE";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(102, 73, 174, 0.1)";
              e.currentTarget.style.color = "#6649AE";
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={checkLogin}
          style={loginButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#5539A0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#6649AE";
          }}
        >
          Login
        </button>
      )}
    </>
  );
}
