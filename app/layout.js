import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Lorenza Longhi — Portfolio",
  description: "Portfolio von Lorenza Longhi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={spaceMono.variable}>
      <body>{children}</body>
    </html>
  );
}
