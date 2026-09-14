import localFont from "next/font/local";
import "./globals.css";
import { client } from "@/sanity/lib/client";
import { layoutQuery } from "@/sanity/lib/queries";
import TabTitleSwitcher from "./TabTitleSwitcher";

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
    const data = await client.fetch(layoutQuery);
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

export default async function RootLayout({ children }) {
  let backgroundColor = "#3D0F35";
  try {
    const data = await client.fetch(layoutQuery);
    backgroundColor = data?.backgroundColor || backgroundColor;
  } catch (error) {
    console.warn("Konnte Hintergrundfarbe nicht laden:", error.message);
  }

  return (
    <html lang="de" className={unFont.variable} style={{ backgroundColor }}>
      <body style={{ backgroundColor }}>
        <TabTitleSwitcher />
        {children}
      </body>
    </html>
  );
}