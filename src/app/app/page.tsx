"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { AddChannelForm } from "@/components/app/AddChannelForm";
import { ChannelCardGrid } from "@/components/app/ChannelCardGrid";
import { useChannels } from "@/lib/hooks/useChannels";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const { data: channels, isLoading, mutate } = useChannels(email || null);

  const [lookupEmail, setLookupEmail] = useState("");
  const [lookupError, setLookupError] = useState("");

  const handleSuccess = (newEmail: string) => {
    router.push(`/app?email=${encodeURIComponent(newEmail)}`);
    mutate();
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError("");
    if (!lookupEmail.includes("@")) {
      setLookupError("Please enter a valid email address.");
      return;
    }
    router.push(`/app?email=${encodeURIComponent(lookupEmail)}`);
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

      {/* Initial state: two options */}
      {!email ? (
        <div className="max-w-xl mx-auto pt-8 space-y-10">
          {/* Option 1: Track a new channel */}
          <AddChannelForm currentEmail="" onSuccess={handleSuccess} />

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
              <Button type="submit" variant="secondary" className="w-full">
                View My Channels
              </Button>
            </form>
          </div>
        </div>
      ) : (
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
