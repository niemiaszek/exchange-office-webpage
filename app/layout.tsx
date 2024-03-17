import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from "./header";
import Providers from "./providers";
import localFont from "next/font/local";

export const metadata = {
  title: "Kantor FIFO Chełm",
  description: "Kantor Wymiany Walut. Najlepsze ceny",
  creator: "Patryk Niemiec",
  openGraph: {
    title: "Kantor FIFO Chełm",
    description: "Kantor Wymiany Walut. Najlepsze ceny",
    url: "https://wwww.kantorfifo.pl",
    siteName: "Kantor FIFO Chełm",
    // TODO: Add correct image
    images: [
      {
        url: "https://wwww.kantorfifo.pl/api/og",
        width: 800,
        height: 600,
      },
    ],
    locale: "pl-PL",
    type: "website",
  },
};

const twemoji = localFont({
  src: "../data/TwemojiCountryFlags.woff2",
  display: "swap",
  variable: "--font-twemoji",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${twemoji.variable}`}>
      <body>
        <Header />
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
