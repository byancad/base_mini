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

  // If user has a Base Account, they're already authenticated via Farcaster
  if (baseAccount) {
    return (
      <>
        <p>Connected via Base Account</p>
        <p>{baseAccount.address}</p>
      </>
    );
  }

  return (
    <>
      {ready && authenticated ? (
        <>
          <button onClick={logout}>Logout</button> <br />
          <p>Logged in as {user?.wallet?.address?.toString()}</p>
        </>
      ) : (
        <button onClick={checkLogin}>Login</button>
      )}
    </>
  );
}
