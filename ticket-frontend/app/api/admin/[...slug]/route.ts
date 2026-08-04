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

const getPath = (slug: string[] = []) => slug.join("/");

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  try {
    const { slug = [] } = await params;
    const backendUrl = getBackendUrl();
    const path = getPath(slug);
    const url = `${backendUrl}/api/admin/${path}${request.nextUrl.search}`;

    const response = await fetch(url);
    const data = await response.text();

    let parsedData: unknown = null;
    try {
      parsedData = data ? JSON.parse(data) : null;
    } catch {
      parsedData = null;
    }

    return NextResponse.json(parsedData ?? {}, { status: response.status });
  } catch (error) {
    console.error("Admin proxy error:", error);
    return NextResponse.json({ success: false, message: "Unable to connect to the server." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  try {
    const { slug = [] } = await params;
    const backendUrl = getBackendUrl();
    const path = getPath(slug);
    const body = await request.text();
    const response = await fetch(`${backendUrl}/api/admin/${path}`, {
      method: "PATCH",
      headers: request.headers,
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
    console.error("Admin patch proxy error:", error);
    return NextResponse.json({ success: false, message: "Unable to connect to the server." }, { status: 500 });
  }
}
