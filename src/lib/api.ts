import type {
  Channel,
  ChannelSnapshot,
  ChannelVideoAnalytics,
  ContactFormData,
  ContactResponse,
} from "./types";

async function callWebhook<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error: ${res.status}`);
  }
  return res.json();
}

export async function getChannelDetails(
  ytChannelUrl: string,
  userEmail: string
): Promise<Channel[]> {
  return callWebhook<Channel[]>({
    event_type: "yt_get_channel_details",
    yt_channel_url: ytChannelUrl,
    user_email: userEmail,
  });
}

export async function getVideoDetails(
  channelId: string
): Promise<{ message: string }> {
  return callWebhook<{ message: string }>({
    event_type: "yt_get_video_details",
    channel_id: channelId,
  });
}

export async function getAllChannels(
  userEmail: string
): Promise<Channel[]> {
  return callWebhook<Channel[]>({
    event_type: "yt_all_channel_details",
    user_email: userEmail,
  });
}

export async function getChannelAnalytics(
  channelId: string
): Promise<ChannelSnapshot[]> {
  return callWebhook<ChannelSnapshot[]>({
    event_type: "yt_channel_analytics",
    channel_id: channelId,
  });
}

export async function getVideoAnalytics(
  userEmail: string
): Promise<ChannelVideoAnalytics[]> {
  return callWebhook<ChannelVideoAnalytics[]>({
    event_type: "yt_channel_video_analytics",
    user_email: userEmail,
  });
}

export async function deleteChannel(
  channelId: string,
  userEmail: string
): Promise<{ message: string }> {
  return callWebhook<{ message: string }>({
    event_type: "delete_user_channel",
    channel_id: channelId,
    user_email: userEmail,
  });
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactResponse> {
  return callWebhook<ContactResponse>({
    event_type: "contact_form",
    ...data,
  });
}
