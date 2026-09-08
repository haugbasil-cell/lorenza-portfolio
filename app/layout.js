import localFont from "next/font/local";
import "./globals.css";
import { client } from "@/sanity/lib/client";
import { faviconQuery } from "@/sanity/lib/queries";

const unFont = localFont({
  src: [
    {
      path: "./fonts/UN-11ST-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/UN-11ST-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/UN-11ST-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/UN-11ST-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-mono",
});

export async function generateMetadata() {
  let faviconUrl = null;
  try {
    const data = await client.fetch(faviconQuery);
    faviconUrl = data?.faviconUrl || null;
  } catch (error) {
    console.warn("Konnte Favicon nicht laden:", error.message);
  }

  return {
    title: "Lorenza Longhi — Portfolio",
    description: "Portfolio von Lorenza Longhi",
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={unFont.variable}>
      <body>{children}</body>
    </html>
  );
}