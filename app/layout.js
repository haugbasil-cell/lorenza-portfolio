import localFont from "next/font/local";
import "./globals.css";

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

export const metadata = {
  title: "Lorenza Longhi — Portfolio",
  description: "Portfolio von Lorenza Longhi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={unFont.variable}>
      <body>{children}</body>
    </html>
  );
}