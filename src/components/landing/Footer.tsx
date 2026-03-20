"use client";

import { useState } from "react";
import Link from "next/link";
import { ContactDialog } from "./ContactDialog";

export function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <polygon points="10,8 16,12 10,16" />
                  </svg>
                </div>
                <span className="font-heading text-base font-bold tracking-tight">
                  YT Analytics
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                Track your YouTube channel performance with real-time analytics. Free and open for everyone.
              </p>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-heading text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setContactOpen(true)}
                    className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-heading text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} YT Analytics. All rights reserved.
            </p>
            <p className="text-xs text-muted">
              Built with Next.js and n8n.
            </p>
          </div>
        </div>
      </footer>

      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
