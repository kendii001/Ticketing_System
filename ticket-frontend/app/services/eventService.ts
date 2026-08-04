const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getEvents = async (params?: URLSearchParams | string) => {
  const queryString = params ? `?${params.toString()}` : "";
  const fullUrl = `${API_URL}/api/events${queryString}`;

  // Log to check client-side evaluation
  console.log("Fetching URL:", fullUrl);

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  return response.json();
};