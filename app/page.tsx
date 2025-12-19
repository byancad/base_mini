"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Connect from "@/components/connect/connect";
import BuyLava from "@/components/buy/BuyLava";
import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";
Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);
  return (
    <main>
      <Connect />
      <BuyLava />
    </main>
  );
}
