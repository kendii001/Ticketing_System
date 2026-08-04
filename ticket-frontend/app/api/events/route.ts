import { NextRequest, NextResponse } from "next/server";

const getBackendUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

  if (configuredUrl) {
    return configuredUrl;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:5000";
};

export async function GET(request: NextRequest) {
  try {
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/api/events${request.nextUrl.search}`);
    const data = await response.text();

    let parsedData: unknown = null;
    try {
      parsedData = data ? JSON.parse(data) : null;
    } catch {
      parsedData = null;
    }

    return NextResponse.json(parsedData ?? {}, { status: response.status });
  } catch (error) {
    console.error("Events proxy error:", error);
    return NextResponse.json({ success: false, message: "Unable to connect to the server." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const backendUrl = getBackendUrl();
    const body = await request.text();
    const response = await fetch(`${backendUrl}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.text();
    let parsedData: unknown = null;
    try {
      parsedData = data ? JSON.parse(data) : null;
    } catch {
      parsedData = null;
    }

    return NextResponse.json(parsedData ?? {}, { status: response.status });
  } catch (error) {
    console.error("Events proxy POST error:", error);
    return NextResponse.json({ success: false, message: "Unable to connect to the server." }, { status: 500 });
  }
}
