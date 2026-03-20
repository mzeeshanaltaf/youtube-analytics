# YT Analytics

A YouTube channel analytics tracker built with Next.js. No login or signup required — just enter your email and a YouTube channel URL to start tracking subscriber growth, daily views, and video performance metrics.

## Features

- **Channel Tracking** — Add any YouTube channel by URL and track it over time
- **Subscriber Growth Chart** — Visualize subscriber trends with an area chart
- **Daily View Gain Chart** — Bar chart showing daily view performance
- **Video Highlights** — Top performing videos by views, likes, comments, and duration
- **Channel Stats** — Total subscribers, views, video count, 30-day sub gain, and average views per video
- **Delete Channels** — Remove a channel and its data from your dashboard
- **Dark / Light Theme** — Full theme support via `next-themes`
- **No Auth Required** — Email-based identity; channels are scoped to your email address

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Charts | Recharts (dynamically imported) |
| Animations | Framer Motion |
| Data Fetching | SWR |
| Theme | next-themes |
| Backend | n8n webhooks (self-hosted) |
| Fonts | Space Grotesk, JetBrains Mono, DM Sans |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Marketing landing page
│   ├── globals.css               # Tailwind + CSS custom properties (dark/light tokens)
│   ├── app/
│   │   ├── layout.tsx            # App shell with header
│   │   ├── page.tsx              # Dashboard (channel cards)
│   │   └── channel/[id]/
│   │       └── page.tsx          # Channel detail (charts + video metrics)
│   └── api/webhook/
│       └── route.ts              # Server proxy to n8n (keeps API key server-side)
├── components/
│   ├── landing/                  # Navbar, Hero, Features, HowItWorks, CTA, Footer
│   │   └── ContactDialog.tsx     # Contact form with validation
│   └── app/                      # AddChannelForm, ChannelCard, ChannelCardGrid,
│                                 # ChannelHeader, AnalyticsCharts, VideoMetricsGrid
├── lib/
│   ├── api.ts                    # Client-side API service (all calls via /api/webhook)
│   ├── types.ts                  # TypeScript interfaces
│   ├── constants.ts              # Webhook URL mappings
│   ├── utils.ts                  # Number/date/duration formatters
│   └── hooks/                   # SWR hooks: useChannels, useChannelAnalytics, useVideoAnalytics
└── styles/
    └── fonts.ts                  # next/font/google config
```

## Getting Started

### Prerequisites

- Node.js 18+
- An n8n instance with the required workflows set up

### Installation

```bash
git clone https://github.com/your-username/yt-analytics.git
cd yt-analytics
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
N8N_API_KEY=your_n8n_api_key_here
```

The API key is injected server-side by the `/api/webhook` proxy route and is never exposed to the client.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## How It Works

1. All API calls from the browser go to `/api/webhook` (the Next.js route handler)
2. The route handler reads `event_type` from the request body, looks up the correct n8n webhook URL, injects the `x-api-key` header, and forwards the request
3. Responses are passed back to the client as-is
4. SWR caches responses for 5 minutes — navigating back to a page does not re-trigger webhook calls

### n8n Webhook Events

| Event | Description |
|---|---|
| `yt_get_channel_details` | Fetch and store channel info by URL |
| `yt_all_channel_details` | Get all tracked channels for an email |
| `yt_channel_analytics` | Daily snapshot history for a channel |
| `yt_channel_video_analytics` | Video metrics (top views/likes/comments/duration) |
| `delete_user_channel` | Remove a channel for an email |
| `contact_form` | Submit the contact form |

## Deployment

Deploy to [Vercel](https://vercel.com) with one click. Set the `N8N_API_KEY` environment variable in your Vercel project settings.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

MIT
