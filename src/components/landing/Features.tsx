"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/Card";

const features = [
  {
    title: "Channel Tracking",
    description:
      "Add any YouTube channel by URL and instantly see subscriber counts, total views, and video uploads at a glance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14" />
        <rect x="3" y="6" width="12" height="12" rx="2" />
      </svg>
    ),
    accent: "text-chart-1",
    glow: "group-hover:shadow-chart-1/10",
  },
  {
    title: "Daily Analytics",
    description:
      "Visualize subscriber growth, view velocity, and daily gains through beautiful interactive charts over time.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
      </svg>
    ),
    accent: "text-chart-2",
    glow: "group-hover:shadow-chart-2/10",
  },
  {
    title: "Video Insights",
    description:
      "Discover your top-performing content — most viewed, most liked, most commented videos, and your longest uploads.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    accent: "text-chart-3",
    glow: "group-hover:shadow-chart-3/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to
            <span className="text-accent"> grow</span>
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Simple yet powerful tools to understand your YouTube presence and
            make data-driven decisions.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.15}>
              <Card
                hover
                className={`group h-full shadow-lg shadow-transparent transition-shadow ${feature.glow}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center mb-5 ${feature.accent}`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
