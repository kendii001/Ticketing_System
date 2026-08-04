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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ country: string }> }
) {
  try {
    const { country } = await params;
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/pricing/${encodeURIComponent(country)}`);

    const data = await response.text();
    let parsedData: unknown = null;

    try {
      parsedData = data ? JSON.parse(data) : null;
    } catch {
      parsedData = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: parsedData && typeof parsedData === "object" && "message" in parsedData
            ? String((parsedData as { message?: string }).message)
            : "Failed to load pricing.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(parsedData ?? {}, { status: 200 });
  } catch (error) {
    console.error("Pricing proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to connect to the server." },
      { status: 500 }
    );
  }
}
