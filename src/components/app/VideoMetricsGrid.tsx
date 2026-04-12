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
      <div className="space-y-8">
        <h3 className="font-heading text-xl font-semibold">Video Highlights</h3>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-4 w-32 mb-3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="rounded-xl bg-surface border border-border p-4">
                  <Skeleton className="h-7 w-7 rounded-full mb-3" />
                  <Skeleton className="aspect-video w-full mb-3" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/3" />
                </div>
              ))}
            </div>
          </div>
        ))}
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

  type MetricType = "highest_views" | "highest_likes" | "highest_comments" | "longest_duration" | "most_recent";

  const metricOrder: MetricType[] = [
    "highest_views",
    "highest_likes",
    "highest_comments",
    "longest_duration",
    "most_recent",
  ];

  const metricLabels: Record<MetricType, string> = {
    highest_views: "Most Viewed",
    highest_likes: "Most Liked",
    highest_comments: "Most Commented",
    longest_duration: "Longest Videos",
    most_recent: "Most Recent",
  };

  const grouped = metricOrder
    .map((type) => ({
      type,
      label: metricLabels[type],
      videos: channelData.metrics
        .filter((m) => m.metric === type)
        .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99)),
    }))
    .filter((g) => g.videos.length > 0);

  return (
    <div className="space-y-8">
      <h3 className="font-heading text-xl font-semibold">Video Highlights</h3>
      {grouped.map(({ type, label, videos }) => (
        <div key={type}>
          <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
            {label}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((metric) => (
              <VideoMetricCard key={`${metric.metric}-${metric.rank}`} metric={metric} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
