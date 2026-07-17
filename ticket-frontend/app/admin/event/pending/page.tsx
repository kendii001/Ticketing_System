"use client";

import { useEffect, useState } from "react";

interface EventItem {
  id: number;
  title: string;
  organizer_name: string;
  event_date: string;
  venue: string;
  status: string;
}

export default function PendingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/events/pending`);
      const data = await res.json();
      if (data.success) setEvents(data.events);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id: number) => {
    await fetch(`${API}/api/events/${id}/approve`, { method: "PATCH" });
    fetchPending();
  };

  const handleReject = async (id: number) => {
    await fetch(`${API}/api/events/${id}/reject`, { method: "PATCH" });
    fetchPending();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Pending Events</h1>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-400">No pending events.</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4">Event</th>
                <th className="text-left p-4">Organizer</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Venue</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b last:border-b-0">
                  <td className="p-4">{event.title}</td>
                  <td className="p-4">{event.organizer_name}</td>
                  <td className="p-4">{event.event_date}</td>
                  <td className="p-4">{event.venue}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleApprove(event.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(event.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}