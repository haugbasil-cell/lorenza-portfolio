import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: [
    { path: "./fonts/UN-11STTrial-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/UN-11STTrial-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-mono",
});

export const metadata = {
  title: "Lorenza Longhi — Portfolio",
  description: "Portfolio von Lorenza Longhi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={myFont.variable}>
      <body>{children}</body>
    </html>
  );
}
