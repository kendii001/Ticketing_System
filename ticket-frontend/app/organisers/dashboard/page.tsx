"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Ticket,
  DollarSign,
  Users,
  Plus,
  Eye,
} from "lucide-react";

interface EventItem {
  id: number;
  title: string;
  event_date: string;
  venue: string;
  price: number;
  status: string;
}

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`/api/events?status=pending&status=published`);
        const data = await res.json();
        if (data.success) {
          setEvents(data.events.slice(0, 5));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const stats = [
    {
      title: "Total Events",
      value: events.length,
      icon: CalendarDays,
      color: "bg-pink-500",
    },
    {
      title: "Pending",
      value: events.filter((event) => event.status === "pending").length,
      icon: Ticket,
      color: "bg-blue-500",
    },
    {
      title: "Revenue",
      value: `KES ${events.reduce((sum, event) => sum + Number(event.price || 0), 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Published",
      value: events.filter((event) => event.status === "published").length,
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-[#CC338B] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              Organizer Dashboard
            </h1>

            <p className="mt-2 text-pink-100">
              Welcome back! Here's an overview of your events.
            </p>
          </div>

          <Link
            href="/organisers/event/create"
            className="mt-5 md:mt-0 bg-white text-[#CC338B] px-5 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100"
          >
            <Plus size={18} />
            Create Event
          </Link>

        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-500 text-sm">
                      {stat.title}
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                      {stat.value}
                    </h2>
                  </div>

                  <div className={`${stat.color} p-3 rounded-full text-white`}>
                    <Icon size={24} />
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* Recent Events */}
        <div className="mt-10 bg-white rounded-xl shadow-md">

          <div className="flex justify-between items-center p-6 border-b">

            <h2 className="text-xl font-bold">
              Recent Events
            </h2>

            <Link
              href="/organisers/event"
              className="text-[#CC338B] font-semibold hover:underline"
            >
              View All
            </Link>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>
                  <th className="text-left p-4">Event</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Venue</th>
                  <th className="text-left p-4">Tickets</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Action</th>
                </tr>

              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-gray-500">
                      Loading your events...
                    </td>
                  </tr>
                ) : events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-gray-500">
                      No events yet. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{event.title}</td>
                      <td className="p-4">{event.event_date}</td>
                      <td className="p-4">{event.venue}</td>
                      <td className="p-4">{event.price}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            event.status === "published"
                              ? "bg-green-100 text-green-700"
                              : event.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/organisers/event/${event.id}/edit`}
                          className="text-[#CC338B] hover:underline flex items-center gap-1"
                        >
                          <Eye size={18} />
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <Link
            href="/organisers/event/create"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-2">
              Create New Event
            </h3>

            <p className="text-gray-600">
              Add a new event and start selling tickets.
            </p>
          </Link>

          <Link
            href="/organisers/tickets"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-2">
              Manage Tickets
            </h3>

            <p className="text-gray-600">
              View sold tickets and attendee information.
            </p>
          </Link>

          <Link
            href="/organisers/sales"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-2">
              Sales Report
            </h3>

            <p className="text-gray-600">
              Track revenue and ticket sales analytics.
            </p>
          </Link>

        </div>

      </div>

    </main>
  );
}