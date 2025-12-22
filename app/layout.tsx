import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

const URL =
  process.env.NEXT_PUBLIC_URL || "https://main.dzwftl90knlfz.amplifyapp.com";

const miniapp = {
  version: "1",
  name: "Lava Dev Mini App",
  homeUrl: `${URL}/`,
  iconUrl: `${URL}/lizzard.png`,
  heroImageUrl: `${URL}/lizzzz.png`,
  description: "Buy LAVA tokens.",
};

export const metadata: Metadata = {
  title: miniapp.name,
  description: miniapp.description,
  other: {
    "base:app_id": "6941beecd77c069a945bdf74",
    "fc:miniapp": JSON.stringify({
      version: miniapp.version,
      imageUrl: "https://main.dzwftl90knlfz.amplifyapp.com/lizzzz.png",
      button: {
        title: `Join the ${miniapp.name}`,
        action: {
          type: "launch_frame",
          name: `Launch ${miniapp.name}`,
          url: `${miniapp.homeUrl}`,
          splashImageUrl: "https://main.dzwftl90knlfz.amplifyapp.com/green.png",
          splashBackgroundColor: "#800020",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
