"use client";

import { useParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useChannelAnalytics } from "@/lib/hooks/useChannelAnalytics";
import { useVideoAnalytics } from "@/lib/hooks/useVideoAnalytics";
import { ChannelHeader } from "@/components/app/ChannelHeader";
import { VideoMetricsGrid } from "@/components/app/VideoMetricsGrid";
import { Skeleton } from "@/components/ui/Skeleton";
import { getSession } from "@/lib/session";

const AnalyticsCharts = dynamic(
  () =>
    import("@/components/app/AnalyticsCharts").then((mod) => ({
      default: mod.AnalyticsCharts,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-surface border border-border p-5">
          <Skeleton className="h-5 w-40 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="rounded-xl bg-surface border border-border p-5">
          <Skeleton className="h-5 w-40 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    ),
  }
);

function ChannelDetailContent() {
  const params = useParams();
  const router = useRouter();
  const channelId = params.id as string;

  const [email, setEmail] = useState("");
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setEmail(session.email);
    } else {
      router.replace("/app");
    }
    setSessionChecked(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: analytics, isLoading: analyticsLoading } =
    useChannelAnalytics(channelId);
  const { data: videoAnalytics, isLoading: videoLoading } =
    useVideoAnalytics(email || null);

  const channelTitle = analytics?.[0]?.channel_title || "";

  if (!sessionChecked) return null;

  return (
    <div className="space-y-8">
      {/* Channel Header */}
      {analyticsLoading ? (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div>
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-32 mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-surface border border-border p-4">
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-7 w-24" />
              </div>
            ))}
          </div>
        </div>
      ) : analytics && analytics.length > 0 ? (
        <ChannelHeader analytics={analytics} email={email} />
      ) : (
        <div className="text-center py-12 text-muted">
          No analytics data available for this channel yet.
        </div>
      )}

      {/* Charts */}
      {analytics && analytics.length > 0 && (
        <AnalyticsCharts analytics={analytics} />
      )}

      {/* Video Metrics */}
      <VideoMetricsGrid
        videoAnalytics={videoAnalytics}
        channelTitle={channelTitle}
        isLoading={videoLoading}
      />
    </div>
  );
}

export default function ChannelDetailPage() {
  return (
    <Suspense>
      <ChannelDetailContent />
    </Suspense>
  );
}
