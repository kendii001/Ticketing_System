const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ticketing-system-n41q.onrender.com";

export const getEvents = async (
  params?: URLSearchParams | string
) => {
  let queryString = "";

  if (params) {
    queryString =
      typeof params === "string"
        ? `?${params}`
        : `?${params.toString()}`;
  }

  const response = await fetch(
    `${API_URL}/api/events${queryString}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch events."
    );
  }

  return data;
};