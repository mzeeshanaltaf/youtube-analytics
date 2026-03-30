"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getChannelDetails } from "@/lib/api";

interface AddChannelFormProps {
  currentEmail: string;
  onSuccess: (email: string) => void;
  compact?: boolean;
}

export function AddChannelForm({
  currentEmail,
  onSuccess,
  compact = false,
}: AddChannelFormProps) {
  const [email, setEmail] = useState(currentEmail);
  const [channelUrl, setChannelUrl] = useState("");

  useEffect(() => {
    if (currentEmail) setEmail(currentEmail);
  }, [currentEmail]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!channelUrl.includes("youtube.com/")) {
      setError("Please enter a valid YouTube channel URL.");
      return;
    }

    setLoading(true);
    try {
      await getChannelDetails(channelUrl, email);
      onSuccess(email);
      setChannelUrl("");
    } catch {
      setError("Failed to fetch channel details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`flex flex-col gap-4 ${compact ? "" : "max-w-xl mx-auto"}`}
      >
        {!compact && (
          <div className="text-center mb-4">
            <h2 className="font-heading text-2xl font-bold">
              Start Tracking a Channel
            </h2>
            <p className="text-muted text-sm mt-2">
              Enter your email and a YouTube channel URL to get started.
            </p>
          </div>
        )}

        <div className={compact ? "flex flex-col sm:flex-row gap-3" : "flex flex-col gap-3"}>
          {!currentEmail && (
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              label={compact ? undefined : "Email Address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <div className="flex-1">
            <Input
              id="channel-url"
              type="url"
              placeholder="https://www.youtube.com/@ChannelName"
              label={compact ? undefined : "YouTube Channel URL"}
              value={channelUrl}
              onChange={(e) => setChannelUrl(e.target.value)}
              required
            />
          </div>
          <div className={compact ? "sm:self-end" : ""}>
            <Button
              type="submit"
              disabled={loading}
              className={compact ? "w-full sm:w-auto" : "w-full"}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Adding...
                </span>
              ) : compact ? (
                "Add Channel"
              ) : (
                "Start Tracking"
              )}
            </Button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}
      </div>
    </form>
  );
}
