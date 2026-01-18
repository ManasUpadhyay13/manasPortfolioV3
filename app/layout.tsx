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
  title: "Manas Upadhyay | Software Engineer",
  description: "Software Engineer portfolio showcasing experienced product building.",
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
      <head>
        <meta property="og:title" content="manas upadhyay" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manasupadhyay.xyz" />
        <meta property="og:image" content="/assets/ogimage.png" />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} ${italiana.variable} antialiased text-foreground bg-background`}
      >
        <SmoothScroll />
        <OnekoCat />
        {process.env.NODE_ENV === "development" && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.UMAMI_WEBSITE_ID}
          ></script>
        )}
        {children}
      </body>
    </html>
  );
}
