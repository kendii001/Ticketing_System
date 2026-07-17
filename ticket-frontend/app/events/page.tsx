"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Search, CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EventItem {
  id: number;
  title: string;
  description: string;
  category: string;
  event_date: string;
  event_time: string;
  venue: string;
  price: number;
  organizer_name: string;
  status: string;
}

function EventContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [date, setDate] = useState<Date | undefined>();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const countries = [
    "All Countries",
    "Kenya",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Nigeria",
    "South Africa",
    "Ghana",
    "USA",
    "United Kingdom",
  ];

  const categories = [
    { name: "All Categories<<" },
    { name: "concert & live Music" },
    { name: "Art & Culture" },
    { name: "Business"},
    { name: "Sports"},
    { name: "Film,Theatre &performing Arts" },
    { name: "Comedy"},
    { name: "Festivals"},
    { name: "Networking & Conferences" },
    { name: "Food&Drinks" },
    { name: "Health & Wellness" },
    { name: "Charity & Causes" },
  ];

  const fetchEvents = async (params: URLSearchParams) => {
    setLoading(true);

    const queryParams = new URLSearchParams(params.toString());
    queryParams.set("status", "published");

    try {
      const res = await fetch(`${API}/api/events?${queryParams.toString()}`);
      const data = await res.json();

      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentQuery = searchParams.get("q") || "";
    const currentCountry = searchParams.get("country") || "All Countries";
    const currentDate = searchParams.get("date");

    setQuery(currentQuery);
    setCountry(currentCountry || "All Countries");
    setDate(currentDate ? new Date(currentDate) : undefined);

    fetchEvents(searchParams);
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.append("q", query.trim());
    }

    if (country !== "All Countries") {
      params.append("country", country);
    }

    if (date) {
      params.append("date", format(date, "yyyy-MM-dd"));
    }

    router.push(`/events?${params.toString()}`);
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="rounded-2xl shadow-xl p-5">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <h1 className="text-2xl font-bold text-pink-600 whitespace-nowrap">
            ShereheSasa
          </h1>

          <div className="flex flex-1 items-center border rounded-xl px-4">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full p-3 outline-none bg-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            className="border rounded-xl bg-white p-3 lg:w-56"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <Popover>
            <PopoverTrigger>
              <Button variant="outline" className="justify-start lg:w-60">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select Date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>

          <button
            onClick={handleSearch}
            className="rounded-xl bg-pink-600 px-8 py-3 font-semibold text-white hover:bg-pink-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      <div className="mt-6 border-y border-gray-200">
        <nav className="flex items-center justify-between gap-8 px-4 py-4 overflow-x-auto whitespace-nowrap">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/events?category=${encodeURIComponent(category.name)}`}
              className="flex items-center gap-2 text-gray-700 hover:text-pink-600 font-medium transition shrink-0"
            >
              {category.icon && <span className="text-lg">{category.icon}</span>}
              <span>{category.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Upcoming Events</h2>
          <p className="text-sm text-gray-500">Published events only</p>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
            No published events found yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <article key={event.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-700">
                    {event.category}
                  </span>
                  <span className="text-sm text-gray-500">{event.status}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{event.description}</p>

                <div className="mt-4 space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Date:</span> {event.event_date}</p>
                  <p><span className="font-medium">Time:</span> {event.event_time}</p>
                  <p><span className="font-medium">Venue:</span> {event.venue}</p>
                  <p><span className="font-medium">Organizer:</span> {event.organizer_name}</p>
                  <p><span className="font-medium">Price:</span> KSh {event.price?.toLocaleString()}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Event() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading events...</div>}>
      <EventContent />
    </Suspense>
  );
}