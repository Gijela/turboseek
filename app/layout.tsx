import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import "./globals.css";
import { SearchContextProvider } from "@/components/provide/SearchProvide";
import { Analytics } from "@vercel/analytics/react"

let title = "Google";
let description =
  "Search smarter and faster with our open source AI search engine";
let url = "https://turboseek.io/";
let ogimage = "https://turboseek.io/og-image.png";
let sitename = "TurboSeek.io";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="turboseek.io" />
      </head>
      <body>
        <SearchContextProvider>{children}</SearchContextProvider>
      </body>
      <Analytics />
    </html>
  );
}
