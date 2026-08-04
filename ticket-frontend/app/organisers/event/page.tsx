"use client";

import Link from "next/link";
import { Calendar, MapPin, Pencil, Trash2, Plus } from "lucide-react";

export default function OrganizerEventsPage() {
  const events = [
    {
      id: 1,
      title: "Nairobi Music Festival",
      date: "20 Jul 2026",
      venue: "KICC, Nairobi",
      category: "Music",
      price: 2500,
      ticketsSold: 320,
      status: "Published",
    },
    {
      id: 2,
      title: "Tech Summit Kenya",
      date: "28 Jul 2026",
      venue: "Sarit Expo Centre",
      category: "Technology",
      price: 1500,
      ticketsSold: 180,
      status: "Pending",
    },
    {
      id: 3,
      title: "Food Festival",
      date: "10 Aug 2026",
      venue: "Uhuru Gardens",
      category: "Food",
      price: 1000,
      ticketsSold: 450,
      status: "Published",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold text-[#CC338B]">
              My Events
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all your events from one place.
            </p>
          </div>

          <Link
            href="/organisers/event/create"
            className="flex items-center gap-2 bg-[#CC338B] text-white px-5 py-3 rounded-lg hover:bg-pink-700 transition"
          >
            <Plus size={20} />
            Create Event
          </Link>

        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {events.map((event) => (

            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800"
                alt={event.title}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-5">

                <h2 className="text-xl font-bold mb-3">
                  {event.title}
                </h2>

                <div className="space-y-2 text-gray-600 text-sm">

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {event.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.venue}
                  </div>

                  <p>
                    <strong>Category:</strong> {event.category}
                  </p>

                  <p>
                    <strong>Price:</strong> KES {event.price}
                  </p>

                  <p>
                    <strong>Tickets Sold:</strong> {event.ticketsSold}
                  </p>

                </div>

                {/* Status */}
                <div className="mt-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {event.status}
                  </span>

                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">

                  <Link
                    href={`/organisers/event/${event.id}/edit`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Pencil size={18} />
                    Edit
                  </Link>

                  <button
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    onClick={() => alert("Delete functionality goes here")}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}