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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = getBackendUrl();

    const response = await fetch(`${backendUrl}/pricing/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

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
            : "Calculation failed.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(parsedData ?? {}, { status: 200 });
  } catch (error) {
    console.error("Pricing calculation proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to connect to the server." },
      { status: 500 }
    );
  }
}
