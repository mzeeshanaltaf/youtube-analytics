"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <polygon points="10,8 16,12 10,16" />
            </svg>
          </div>
          <span className="font-heading text-lg font-bold tracking-tight">
            YT Analytics
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="/#features"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="/#how-it-works"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            How It Works
          </a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button href="/app" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
