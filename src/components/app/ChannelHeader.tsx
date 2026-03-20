"use client";

import Link from "next/link";
import type { ChannelSnapshot } from "@/lib/types";
import { formatNumber, parseNum } from "@/lib/utils";

interface ChannelHeaderProps {
  analytics: ChannelSnapshot[];
  email: string;
}

export function ChannelHeader({ analytics, email }: ChannelHeaderProps) {
  const latest = analytics[analytics.length - 1];
  if (!latest) return null;

  const totalViews = parseNum(latest.total_view_count);
  const viewsPerVideo = parseNum(latest.views_per_video);
  const totalVideos = viewsPerVideo > 0 ? Math.round(totalViews / viewsPerVideo) : 0;

  const stats = [
    {
      label: "Total Subscribers",
      value: formatNumber(latest.total_subscribers),
      color: "text-chart-1",
    },
    {
      label: "Total Views",
      value: formatNumber(latest.total_view_count),
      color: "text-chart-2",
    },
    {
      label: "Total Videos",
      value: formatNumber(totalVideos),
      color: "text-chart-3",
    },
    {
      label: "30-Day Sub Gain",
      value: `+${formatNumber(latest.subs_last_30_days)}`,
      color: "text-chart-4",
    },
    {
      label: "Average Views / Video",
      value: formatNumber(latest.views_per_video),
      color: "text-chart-5",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/app?email=${encodeURIComponent(email)}`}
          className="w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center hover:border-border-hover transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
            {latest.channel_title}
          </h1>
          <p className="text-sm text-muted mt-0.5">Channel Analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-surface border border-border p-4"
          >
            <div className="text-xs text-muted mb-1">{stat.label}</div>
            <div className={`font-mono text-xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
