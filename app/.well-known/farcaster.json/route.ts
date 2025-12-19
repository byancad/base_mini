export async function GET() {
  const URL =
    process.env.NEXT_PUBLIC_URL || "https://main.dzwftl90knlfz.amplifyapp.com";

  return Response.json({
    accountAssociation: {
      header: "",
      payload: "",
      signature: "",
    },
    miniapp: {
      version: "1",
      name: "Example Mini App",
      homeUrl: `${URL}/`,
      iconUrl: `${URL}/lizzard.png`,
      splashImageUrl: `${URL}/green.png`,
      splashBackgroundColor: "#000000",
      webhookUrl: `${URL}/api/webhook`,
      subtitle: "Fast, fun, social",
      description: "A fast, fun way to challenge friends in real time.",
      screenshotUrls: [`${URL}/s1.png`, `${URL}/s2.png`, `${URL}/s3.png`],
      primaryCategory: "social",
      tags: ["example", "miniapp", "baseapp"],
      heroImageUrl: `${URL}/lizzzz.png`,
      tagline: "Buy LAVA tokens.",
      ogTitle: "Test Mini App",
      ogDescription: "Buy LAVA tokens description.",
      ogImageUrl: `${URL}/lizzzz.png`,
      noindex: true,
    },
  });
}
