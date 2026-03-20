"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <div className="mesh-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10" />
      </div>

      <AnimatedSection className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
          Start tracking
          <br />
          <span className="text-accent">your growth</span> today
        </h2>
        <p className="mt-6 text-lg text-muted max-w-lg mx-auto">
          Join creators who use YT Analytics to understand their audience
          and optimize their content strategy.
        </p>
        <div className="mt-10">
          <Button href="/app" size="lg">
            Get Started Free
            <svg
              className="ml-2 w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
}
