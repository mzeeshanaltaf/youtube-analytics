import useSWR from "swr";
import { getChannelAnalytics } from "@/lib/api";
import type { ChannelSnapshot } from "@/lib/types";

export function useChannelAnalytics(channelId: string | null) {
  return useSWR<ChannelSnapshot[]>(
    channelId ? ["channel-analytics", channelId] : null,
    () => getChannelAnalytics(channelId!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // 5 min — serve from cache within this window
    }
  );
}
