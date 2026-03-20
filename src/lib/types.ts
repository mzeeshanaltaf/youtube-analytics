export interface Channel {
  channel_id: string;
  channel_title: string;
  channel_description: string;
  channel_published_date: string;
  channel_thumbnail: string;
  total_subscribers: string;
  total_view_count: string;
  total_video_count: number;
}

export interface ChannelSnapshot {
  channel_id: string;
  channel_title: string;
  snapshot_date: string;
  total_subscribers: string;
  daily_subscriber_gain: string | null;
  total_view_count: string;
  daily_view_gain: string | null;
  daily_video_uploads: number | null;
  avg_7d_subscriber_gain: string | null;
  views_per_video: string;
  subs_last_30_days: string;
  velocity_7d: string;
}

export interface VideoMetric {
  metric:
    | "highest_comments"
    | "highest_likes"
    | "highest_views"
    | "longest_duration";
  video_id: string;
  video_title: string;
  video_duration: string;
  video_thumbnail: string;
  video_like_counts: number;
  video_view_counts: number;
  video_duration_sec: number;
  video_published_at: string;
  video_comment_counts: number;
}

export interface ChannelVideoAnalytics {
  channel_title: string;
  metrics: VideoMetric[];
}

export type WebhookEvent =
  | "yt_get_channel_details"
  | "yt_get_video_details"
  | "yt_all_channel_details"
  | "yt_channel_analytics"
  | "yt_channel_video_analytics"
  | "delete_user_channel"
  | "contact_form";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  status: string;
  message: string;
}
