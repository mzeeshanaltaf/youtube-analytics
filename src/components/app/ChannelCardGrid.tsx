"use client";

import { ChannelCard } from "./ChannelCard";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Channel } from "@/lib/types";

interface ChannelCardGridProps {
  channels: Channel[] | undefined;
  isLoading: boolean;
  email: string;
  onChannelDeleted?: () => void;
}

export function ChannelCardGrid({
  channels,
  isLoading,
  email,
  onChannelDeleted,
}: ChannelCardGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-surface border border-border p-5">
            <div className="flex items-start gap-4">
              <Skeleton className="w-16 h-16 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j}>
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-3 w-12 mt-1.5" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!channels || channels.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="3" y="6" width="12" height="12" rx="2" />
          </svg>
        </div>
        <p className="text-muted">No channels tracked yet.</p>
        <p className="text-sm text-muted/70 mt-1">
          Add a YouTube channel above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {channels.map((channel) => (
        <ChannelCard key={channel.channel_id} channel={channel} email={email} onDeleted={onChannelDeleted} />
      ))}
    </div>
  );
}
