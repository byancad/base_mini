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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: miniapp.name,
    description: miniapp.description,
    other: {
      "fc:frame": JSON.stringify({
        version: miniapp.version,
        imageUrl: miniapp.heroImageUrl,
        button: {
          title: `Join the ${miniapp.name}`,
          action: {
            name: `Launch ${miniapp.name}`,
            url: `${miniapp.homeUrl}`,
          },
        },
      }),
    },
  };
}

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
