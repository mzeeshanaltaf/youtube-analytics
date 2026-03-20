"use client";

import Image from "next/image";
import type { VideoMetric } from "@/lib/types";
import { formatNumber, parseDuration, formatDate } from "@/lib/utils";

interface VideoMetricCardProps {
  metric: VideoMetric;
}

const metricConfig: Record<
  VideoMetric["metric"],
  { label: string; color: string; bgColor: string; getValue: (m: VideoMetric) => string }
> = {
  highest_views: {
    label: "Most Viewed",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    getValue: (m) => `${formatNumber(m.video_view_counts)} views`,
  },
  highest_likes: {
    label: "Most Liked",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    getValue: (m) => `${formatNumber(m.video_like_counts)} likes`,
  },
  highest_comments: {
    label: "Most Commented",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    getValue: (m) => `${formatNumber(m.video_comment_counts)} comments`,
  },
  longest_duration: {
    label: "Longest Video",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    getValue: (m) => parseDuration(m.video_duration),
  },
};

export function VideoMetricCard({ metric }: VideoMetricCardProps) {
  const config = metricConfig[metric.metric];

  return (
    <a
      href={`https://www.youtube.com/watch?v=${metric.video_id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl bg-surface border border-border p-4
        hover:border-border-hover hover:shadow-lg transition-all duration-300 block"
    >
      {/* Metric badge */}
      <div
        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium mb-3 ${config.bgColor} ${config.color}`}
      >
        {config.label}
      </div>

      {/* Video thumbnail */}
      <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
        <Image
          src={metric.video_thumbnail}
          alt={metric.video_title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-mono px-1.5 py-0.5 rounded">
          {parseDuration(metric.video_duration)}
        </div>
      </div>

      {/* Video info */}
      <h4 className="font-medium text-sm line-clamp-2 leading-snug mb-2">
        {metric.video_title}
      </h4>

      {/* Primary metric */}
      <div className={`font-mono text-lg font-bold ${config.color}`}>
        {config.getValue(metric)}
      </div>

      {/* Secondary stats */}
      <div className="flex gap-4 mt-2 text-xs text-muted">
        <span>{formatNumber(metric.video_view_counts)} views</span>
        <span>{formatNumber(metric.video_like_counts)} likes</span>
        <span>{formatDate(metric.video_published_at)}</span>
      </div>
    </a>
  );
}
