import localFont from "next/font/local";
import "./globals.css";

const unFont = localFont({
  src: [
    {
      path: "./fonts/UN11-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/UN11-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/UN11-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/UN11-BoldItalic.woff2",
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