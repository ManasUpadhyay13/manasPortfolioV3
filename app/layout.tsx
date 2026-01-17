import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Italiana } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Senior Product Engineer",
  description: "Senior Product Engineer portfolio showcasing experienced product building.",
};

import { SmoothScroll } from "@/components/SmoothScroll";
import OnekoCat from "@/components/oneko/OnekoCat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrains.variable} ${italiana.variable} antialiased text-foreground bg-background`}
      >
        <SmoothScroll />
        <OnekoCat />
        {children}
      </body>
    </html>
  );
}
