import type { Metadata } from "next";
import { Geist, Geist_Mono ,Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "SourceNet - The Web2 Data Marketplace Without Friction",
  description: "Transform Your Digital Footprint Into Value. SourceNet is a frictionless Web2 data marketplace powered by Sui blockchain. Zero crypto knowledge required.",
  keywords: "data marketplace, web2, sui blockchain, data monetization, zklogin, sponsored transactions",
  authors: [{ name: "SourceNet Team" }],
  openGraph: {
    title: "SourceNet - Transform Your Digital Footprint Into Value",
    description: "The Web2 Data Marketplace Without Friction",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
