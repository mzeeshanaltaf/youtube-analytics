"use client";

import { VideoMetricCard } from "./VideoMetricCard";
import { Skeleton } from "@/components/ui/Skeleton";
import type { ChannelVideoAnalytics } from "@/lib/types";

interface VideoMetricsGridProps {
  videoAnalytics: ChannelVideoAnalytics[] | undefined;
  channelTitle: string;
  isLoading: boolean;
}

export function VideoMetricsGrid({
  videoAnalytics,
  channelTitle,
  isLoading,
}: VideoMetricsGridProps) {
  if (isLoading) {
    return (
      <div>
        <h3 className="font-heading text-xl font-semibold mb-4">Video Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-surface border border-border p-4">
              <Skeleton className="h-5 w-24 mb-3" />
              <Skeleton className="aspect-video w-full mb-3" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const channelData = videoAnalytics?.find(
    (va) => va.channel_title === channelTitle
  );

  if (!channelData || channelData.metrics.length === 0) {
    return (
      <div>
        <h3 className="font-heading text-xl font-semibold mb-4">Video Highlights</h3>
        <div className="text-center py-8 text-muted">
          <p>No video analytics available yet.</p>
          <p className="text-sm mt-1">Video data is being processed. Check back after 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-heading text-xl font-semibold mb-4">Video Highlights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channelData.metrics.map((metric) => (
          <VideoMetricCard key={metric.metric} metric={metric} />
        ))}
      </div>
    </div>
  );
}
