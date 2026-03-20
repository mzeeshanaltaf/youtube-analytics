"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import type { ChannelSnapshot } from "@/lib/types";
import { parseNum, formatShortDate, formatNumber } from "@/lib/utils";

interface AnalyticsChartsProps {
  analytics: ChannelSnapshot[];
}

interface ChartDataPoint {
  date: string;
  subscribers: number;
  dailyViews: number | null;
  dailySubGain: number | null;
}

function transformData(analytics: ChannelSnapshot[]): ChartDataPoint[] {
  return analytics
    .sort((a, b) => new Date(a.snapshot_date).getTime() - new Date(b.snapshot_date).getTime())
    .map((s) => ({
      date: formatShortDate(s.snapshot_date),
      subscribers: parseNum(s.total_subscribers),
      dailyViews: s.daily_view_gain != null ? parseNum(s.daily_view_gain) : null,
      dailySubGain: s.daily_subscriber_gain != null ? parseNum(s.daily_subscriber_gain) : null,
    }));
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg bg-surface border border-border px-3 py-2 shadow-xl">
      <div className="text-xs text-muted mb-1">{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="font-mono font-medium">
            {formatNumber(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

function abbreviateNum(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value.toString();
}

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const data = transformData(analytics);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gridColor = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const textColor = theme === "dark" ? "#71717a" : "#a1a1aa";

  if (data.length < 2) {
    return (
      <div className="text-center py-12 text-muted">
        <p>Not enough data points to display charts yet.</p>
        <p className="text-sm mt-1">Analytics will appear after more daily snapshots are collected.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Subscriber Growth */}
      <div className="rounded-xl bg-surface border border-border p-5">
        <h3 className="font-heading font-semibold mb-4">Subscriber Growth</h3>
        <div className="h-64">
          {mounted && <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="subGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff0033" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ff0033" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: textColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: textColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={abbreviateNum}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="subscribers"
                stroke="#ff0033"
                strokeWidth={2}
                fill="url(#subGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>}
        </div>
      </div>

      {/* Daily View Gain */}
      <div className="rounded-xl bg-surface border border-border p-5">
        <h3 className="font-heading font-semibold mb-4">Daily View Gain</h3>
        <div className="h-64">
          {mounted && <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: textColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: textColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={abbreviateNum}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="dailyViews"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>}
        </div>
      </div>
    </div>
  );
}
