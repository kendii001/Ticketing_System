
export interface ContactData {
  fullName: string;
  email: string;
  message: string;
}

const getApiUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/contact`;
  }

  return "/api/contact";
};

export const createContact = async (contactData: ContactData) => {
  const response = await fetch(getApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send message.");
  }

  return data;
};

