"use client";
import { usePrivy } from "@privy-io/react-auth";
import React from "react";

export default function Connect() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  const checkLogin = () => {
    login();
  };
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
