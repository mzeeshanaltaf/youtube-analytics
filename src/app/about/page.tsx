import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "About — YT Analytics",
  description: "Learn more about YT Analytics and our mission.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            About <span className="text-accent">YT Analytics</span>
          </h1>

          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              YT Analytics is a free, open tool designed for YouTube creators who want
              to understand their channel performance without the complexity of
              traditional analytics platforms.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-foreground pt-4">
              Our Mission
            </h2>
            <p>
              We believe every creator — from someone just starting out to established
              channels — deserves access to clear, actionable analytics. No paywalls,
              no complicated dashboards, no account creation required.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-foreground pt-4">
              How It Works
            </h2>
            <p>
              Simply provide your email and a YouTube channel URL. We track subscriber
              growth, view counts, and video performance over time, presenting everything
              in clean, interactive charts. Your data is fetched directly from YouTube
              and processed through our automated backend powered by n8n.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-foreground pt-4">
              Built With
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Next.js</strong> — React framework for the web interface</li>
              <li><strong className="text-foreground">n8n</strong> — Workflow automation for data collection and processing</li>
              <li><strong className="text-foreground">YouTube Data API</strong> — Real channel and video metrics</li>
              <li><strong className="text-foreground">Recharts</strong> — Interactive data visualizations</li>
            </ul>

            <div className="pt-6">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
              >
                Start tracking your channel
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
