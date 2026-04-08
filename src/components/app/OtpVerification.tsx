"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { verifyOtp } from "@/lib/api";

interface OtpVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTP_EXPIRY_SECONDS = 600; // 10 minutes
const RESEND_COOLDOWN_SECONDS = 60; // 1 minute

export function OtpVerification({ email, onVerified, onBack }: OtpVerificationProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [expirySeconds, setExpirySeconds] = useState(OTP_EXPIRY_SECONDS);
  const [resending, setResending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // OTP expiry countdown
  useEffect(() => {
    if (expirySeconds <= 0) return;
    const t = setTimeout(() => setExpirySeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [expirySeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit PIN.");
      return;
    }

    if (expirySeconds <= 0) {
      setError("Your PIN has expired. Please request a new one.");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      if (res.success) {
        onVerified();
      } else {
        setError(res.message || "Invalid PIN. Please try again.");
        setOtp("");
        inputRef.current?.focus();
      }
    } catch {
      setError("Failed to verify PIN. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || resending) return;
    setResending(true);
    setError("");
    try {
      const { sendOtp } = await import("@/lib/api");
      const res = await sendOtp(email);
      if (res.success) {
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
        setExpirySeconds(OTP_EXPIRY_SECONDS);
        setOtp("");
        inputRef.current?.focus();
      } else {
        setError(res.message || "Failed to resend PIN. Please try again.");
      }
    } catch {
      setError("Failed to resend PIN. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-md mx-auto pt-8"
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl font-bold mb-2">Check your email</h2>
        <p className="text-muted text-sm">
          We sent a 6-digit PIN to
        </p>
        <p className="font-mono text-sm font-semibold mt-1 text-foreground break-all">
          {email}
        </p>
        <p className="text-xs text-muted mt-3">
          Email is sent from{" "}
          <span className="font-mono text-foreground/70">noreply.ytanalytics@gmail.com</span>
          {" "}— if you don&apos;t see it, check your spam folder before resending.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* OTP input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="otp-input" className="text-sm font-medium text-muted">
            6-Digit PIN
          </label>
          <input
            ref={inputRef}
            id="otp-input"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setOtp(val);
              if (error) setError("");
            }}
            placeholder="000000"
            className={`w-full rounded-lg bg-surface-elevated border border-border px-4 py-3
              text-foreground font-mono text-2xl text-center tracking-[0.5em] placeholder:text-muted/30 placeholder:tracking-normal
              focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
              transition-colors duration-200
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""}`}
          />
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
        </div>

        {/* Expiry timer */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {expirySeconds > 0 ? (
            <span>PIN expires in <span className="font-mono font-medium text-foreground">{formatTime(expirySeconds)}</span></span>
          ) : (
            <span className="text-red-500">PIN has expired — please request a new one</span>
          )}
        </div>

        <Button type="submit" disabled={loading || otp.length !== 6} className="w-full">
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Verifying...
            </span>
          ) : (
            "Verify PIN"
          )}
        </Button>
      </form>

      {/* Resend + Back */}
      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="text-sm text-muted">
          {"Didn't receive it? "}
          {resendCooldown > 0 ? (
            <span className="text-muted/60">
              Resend in <span className="font-mono">{resendCooldown}s</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-accent hover:text-accent-hover font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend PIN"}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
    </motion.div>
  );
}
