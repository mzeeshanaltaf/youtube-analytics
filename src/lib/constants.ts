import type { WebhookEvent } from "./types";

const WEBHOOK_1 = "https://n8n.zeeshanai.cloud/webhook/a1cee92c-716d-483f-9250-9d1ba12647a9";
const WEBHOOK_2 = "https://n8n.zeeshanai.cloud/webhook/c2371ee0-142e-4ed3-acdd-ee92e24ad5a4";
const WEBHOOK_CONTACT = "https://n8n.zeeshanai.cloud/webhook/0a14d4b5-406e-4ba0-b776-82e31a54b929";

export const WEBHOOK_URL_MAP: Record<WebhookEvent, string> = {
  yt_get_channel_details: WEBHOOK_1,
  yt_get_video_details: WEBHOOK_1,
  delete_user_channel: WEBHOOK_1,
  yt_all_channel_details: WEBHOOK_2,
  yt_channel_analytics: WEBHOOK_2,
  yt_channel_video_analytics: WEBHOOK_2,
  contact_form: WEBHOOK_CONTACT,
};
