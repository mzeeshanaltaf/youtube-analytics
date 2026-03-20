import { NextRequest, NextResponse } from "next/server";
import { WEBHOOK_URL_MAP } from "@/lib/constants";
import type { WebhookEvent } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const eventType = body.event_type as WebhookEvent;

  if (!eventType || !WEBHOOK_URL_MAP[eventType]) {
    return NextResponse.json(
      { error: "Invalid event_type" },
      { status: 400 }
    );
  }

  const webhookUrl = WEBHOOK_URL_MAP[eventType];
  const apiKey = process.env.N8N_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
