"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [event, setEvent] = useState({
    title: "",
    description: "",
    category: "",
    eventDate: "",
    eventTime: "",
    venue: "",
    price: "",
    organizerName: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...event,
          price: Number(event.price),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("🎉 Event submitted for approval.");

        router.push("/organisers/dashboard");
      } else {
        alert(data.message || "Failed to create event.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-[#CC338B] mb-8">
          Create New Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 font-semibold">
              Event Title
            </label>

            <input
              type="text"
              name="title"
              value={event.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Nairobi Music Festival"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              value={event.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Describe your event..."
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold">
                Category
              </label>

              <select
                name="category"
                value={event.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              >
                <option value="">Select Category</option>
                <option>Music</option>
                <option>Conference</option>
                <option>Sports</option>
                <option>Festival</option>
                <option>Business</option>
                <option>Education</option>
                <option>Technology</option>
                <option>Health & Wellness</option>
                <option>Charity & Causes</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Organizer Name
              </label>

              <input
                type="text"
                name="organizerName"
                value={event.organizerName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="ShereheSasa"
                required
              />
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold">
                Event Date
              </label>

              <input
                type="date"
                name="eventDate"
                value={event.eventDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Event Time
              </label>

              <input
                type="time"
                name="eventTime"
                value={event.eventTime}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Venue
            </label>

            <input
              type="text"
              name="venue"
              value={event.venue}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="KICC, Nairobi"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold">
                Ticket Price (KES)
              </label>

              <input
                type="number"
                name="price"
                value={event.price}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="1000"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Image URL
              </label>

              <input
                type="url"
                name="imageUrl"
                value={event.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="https://example.com/event.jpg"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#CC338B] text-white py-4 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>

        </form>

      </div>

    </main>
  );
}