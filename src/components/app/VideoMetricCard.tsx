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
  most_recent: {
    label: "Most Recent",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    getValue: (m) => formatDate(m.video_published_at),
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
      {/* Rank badge */}
      {metric.rank != null && (
        <div className="flex items-center gap-2 mb-3">
          <div
            className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold font-mono
              ${metric.rank === 1 ? "bg-yellow-500/20 text-yellow-400" : metric.rank === 2 ? "bg-zinc-400/20 text-zinc-300" : "bg-amber-700/20 text-amber-600"}`}
          >
            #{metric.rank}
          </div>
        </div>
      )}

      {/* Video thumbnail */}
      <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-surface-elevated">
        {metric.video_thumbnail ? (
          <Image
            src={metric.video_thumbnail}
            alt={metric.video_title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}
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
