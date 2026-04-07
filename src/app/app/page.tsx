"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { AddChannelForm } from "@/components/app/AddChannelForm";
import { OtpVerification } from "@/components/app/OtpVerification";
import { ChannelCardGrid } from "@/components/app/ChannelCardGrid";
import { useChannels } from "@/lib/hooks/useChannels";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { sendOtp, getChannelDetails } from "@/lib/api";

interface OtpState {
  email: string;
  action: "track" | "view";
  channelUrl?: string;
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const { data: channels, isLoading, mutate } = useChannels(email || null);

  const [lookupEmail, setLookupEmail] = useState("");
  const [lookupError, setLookupError] = useState("");
  const [otpState, setOtpState] = useState<OtpState | null>(null);
  const [otpSendError, setOtpSendError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);

  const handleSuccess = (newEmail: string) => {
    router.push(`/app?email=${encodeURIComponent(newEmail)}`);
    mutate();
  };

  // Called by AddChannelForm (Start Tracking flow) — triggers OTP
  const handleOtpRequired = async (formEmail: string, channelUrl: string) => {
    setOtpSendError("");
    setSendingOtp(true);
    try {
      const res = await sendOtp(formEmail);
      if (res.success) {
        setOtpState({ email: formEmail, action: "track", channelUrl });
      } else {
        setOtpSendError(res.message || "Failed to send PIN. Please try again.");
      }
    } catch {
      setOtpSendError("Failed to send PIN. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  // Called by View Existing Channels — triggers OTP
  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError("");
    setOtpSendError("");
    if (!lookupEmail.includes("@")) {
      setLookupError("Please enter a valid email address.");
      return;
    }
    setSendingOtp(true);
    try {
      const res = await sendOtp(lookupEmail);
      if (res.success) {
        setOtpState({ email: lookupEmail, action: "view" });
      } else {
        setLookupError(res.message || "Failed to send PIN. Please try again.");
      }
    } catch {
      setLookupError("Failed to send PIN. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  // Called after OTP verified successfully
  const handleOtpVerified = async () => {
    if (!otpState) return;
    if (otpState.action === "track" && otpState.channelUrl) {
      try {
        await getChannelDetails(otpState.channelUrl, otpState.email);
      } catch {
        // channel details fetch failure — still navigate so user lands on dashboard
      }
      handleSuccess(otpState.email);
    } else {
      router.push(`/app?email=${encodeURIComponent(otpState.email)}`);
    }
    setOtpState(null);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          {email ? "Your Channels" : "Get Started"}
        </h1>
        {email && (
          <p className="text-muted text-sm mt-1">
            Tracking channels for <span className="font-mono text-foreground">{email}</span>
          </p>
        )}
      </div>

      {/* OTP verification screen */}
      {!email && otpState ? (
        <OtpVerification
          email={otpState.email}
          onVerified={handleOtpVerified}
          onBack={() => setOtpState(null)}
        />
      ) : !email ? (
        /* Initial state: two options */
        <div className="max-w-xl mx-auto pt-8 space-y-10">
          {/* Option 1: Track a new channel */}
          <div>
            <AddChannelForm
              currentEmail=""
              onSuccess={handleSuccess}
              onOtpRequired={handleOtpRequired}
            />
            {sendingOtp && (
              <p className="text-sm text-muted text-center mt-3 flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending PIN...
              </p>
            )}
            {otpSendError && (
              <p className="text-sm text-red-500 text-center mt-2">{otpSendError}</p>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Option 2: View existing channels */}
          <div>
            <div className="text-center mb-4">
              <h2 className="font-heading text-2xl font-bold">
                View Existing Channels
              </h2>
              <p className="text-muted text-sm mt-2">
                Already tracking channels? Enter your email to view them.
              </p>
            </div>
            <form onSubmit={handleLookup} className="flex flex-col gap-3">
              <Input
                id="lookup-email"
                type="email"
                placeholder="your@email.com"
                label="Email Address"
                value={lookupEmail}
                onChange={(e) => setLookupEmail(e.target.value)}
                error={lookupError}
                required
              />
              <Button type="submit" variant="secondary" className="w-full" disabled={sendingOtp}>
                {sendingOtp ? "Sending PIN..." : "View My Channels"}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        /* Logged-in state: compact add-channel form */
        <div className="rounded-xl bg-surface border border-border p-5">
          <AddChannelForm
            currentEmail={email}
            onSuccess={handleSuccess}
            compact
          />
        </div>
      )}

      {/* Channel grid */}
      {email && (
        <ChannelCardGrid
          channels={channels}
          isLoading={isLoading}
          email={email}
          onChannelDeleted={() => mutate()}
        />
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
