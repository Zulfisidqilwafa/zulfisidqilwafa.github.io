const allowedEvents = new Set([
  "page_view",
  "language_change",
  "project_filter",
  "case_study_open",
  "contact_intent",
  "outbound_click",
]);

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 4096) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }

  try {
    const payload = (await request.json()) as {
      event?: string;
      path?: string;
      language?: string;
      details?: Record<string, unknown>;
    };

    if (!payload.event || !allowedEvents.has(payload.event)) {
      return Response.json({ error: "Unsupported event" }, { status: 400 });
    }

    const analyticsEvent = {
      type: "portfolio_analytics",
      event: payload.event,
      path: String(payload.path ?? "/").slice(0, 160),
      language: payload.language === "en" ? "en" : "id",
      details: payload.details ?? {},
      day: new Date().toISOString().slice(0, 10),
    };

    console.info(JSON.stringify(analyticsEvent));

    return new Response(null, {
      status: 204,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
