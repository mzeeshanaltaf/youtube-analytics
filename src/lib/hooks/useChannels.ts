import useSWR from "swr";
import { getAllChannels } from "@/lib/api";
import type { Channel } from "@/lib/types";

export function useChannels(email: string | null) {
  return useSWR<Channel[]>(
    email ? ["channels", email] : null,
    () => getAllChannels(email!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // 5 min — serve from cache within this window
    }
  );
}
