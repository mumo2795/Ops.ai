import type { Metadata } from "next";
import "@/index.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Ops.AI — Enterprise operations intelligence",
  description:
    "Unify HR, finance, inventory, procurement, marketing, and sales into executive dashboards and a multi-channel Command Center.",
  metadataBase: new URL("https://www.ops.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ops.AI — Enterprise operations intelligence",
    description:
      "Unify HR, finance, inventory, procurement, marketing, and sales into executive dashboards and a multi-channel Command Center.",
    url: "https://www.ops.ai/",
    siteName: "Ops.AI",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ops.AI — Enterprise operations intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ops.AI — Enterprise operations intelligence",
    description:
      "Unify HR, finance, inventory, procurement, marketing, and sales into executive dashboards and a multi-channel Command Center.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/ops-mark.svg",
    shortcut: "/ops-mark.svg",
    apple: "/ops-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
