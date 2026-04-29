import type { Metadata } from "next";
import { spaceGrotesk, jetbrainsMono, dmSans } from "@/styles/fonts";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yt-analytics.zeeshanai.cloud"),
  title: "YT Analytics — Your YouTube Growth, Visualized",
  description:
    "Track your YouTube channel performance with real-time analytics, subscriber trends, and video insights. No signup required.",
  openGraph: {
    type: "website",
    url: "https://yt-analytics.zeeshanai.cloud",
    title: "YT Analytics — Your YouTube Growth, Visualized",
    description:
      "Track your YouTube channel performance with real-time analytics, subscriber trends, and video insights. No signup required.",
    siteName: "YT Analytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "YT Analytics — Your YouTube Growth, Visualized",
    description:
      "Track your YouTube channel performance with real-time analytics, subscriber trends, and video insights. No signup required.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
