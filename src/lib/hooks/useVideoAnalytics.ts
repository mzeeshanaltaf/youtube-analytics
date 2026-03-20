import useSWR from "swr";
import { getVideoAnalytics } from "@/lib/api";
import type { ChannelVideoAnalytics } from "@/lib/types";

export function useVideoAnalytics(email: string | null) {
  return useSWR<ChannelVideoAnalytics[]>(
    email ? ["video-analytics", email] : null,
    () => getVideoAnalytics(email!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // 5 min — serve from cache within this window
    }
  );
}
