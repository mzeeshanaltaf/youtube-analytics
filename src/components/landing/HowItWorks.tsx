"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Enter Your Email",
    description: "Just provide a valid email address. No passwords, no accounts, no hassle.",
    accent: "bg-chart-2",
  },
  {
    number: "02",
    title: "Add a Channel",
    description: "Paste any YouTube channel URL and we'll start tracking it instantly.",
    accent: "bg-accent",
  },
  {
    number: "03",
    title: "View Analytics",
    description: "Explore growth trends, daily metrics, and your top-performing videos.",
    accent: "bg-chart-3",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            Up and running in
            <span className="text-accent"> 30 seconds</span>
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            No setup. No configuration. Just results.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <AnimatedSection
                key={step.number}
                delay={i * 0.2}
                className="text-center relative"
              >
                {/* Step number circle */}
                <div className="relative inline-flex mb-6">
                  <div
                    className={`w-24 h-24 rounded-full ${step.accent} flex items-center justify-center relative z-10`}
                  >
                    <span className="font-mono text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 rounded-full ${step.accent} opacity-20 blur-xl`}
                  />
                </div>

                <h3 className="font-heading text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
