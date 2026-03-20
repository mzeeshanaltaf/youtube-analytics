"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="mesh-blob absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/20"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="mesh-blob absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-chart-2/15"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="mesh-blob absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-chart-5/15"
          style={{ animationDelay: "-14s" }}
        />
        {/* Noise grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface/50 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-chart-3 animate-pulse" />
            <span className="text-xs font-medium text-muted">
              Free to use — No signup required
            </span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            Your YouTube
            <br />
            <span className="text-accent">Growth</span>, Visualized
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Track subscriber trends, view counts, and video performance across
            all your channels. Instant insights, zero friction.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/app" size="lg">
            Start Tracking
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
          <Button href="#features" variant="secondary" size="lg">
            See Features
          </Button>
        </motion.div>

        {/* Floating stats preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { label: "Channels", value: "Unlimited" },
            { label: "Real-time", value: "Analytics" },
            { label: "Video", value: "Insights" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-surface/60 backdrop-blur-sm border border-border p-4"
            >
              <div className="font-mono text-lg font-bold text-accent">
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
