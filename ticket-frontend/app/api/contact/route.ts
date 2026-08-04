import { NextRequest, NextResponse } from "next/server";

const getBackendUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

  if (configuredUrl) {
    return configuredUrl;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://10.111.3.144:5000";
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to send message." },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Contact proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to connect to the server." },
      { status: 500 }
    );
  }
}
