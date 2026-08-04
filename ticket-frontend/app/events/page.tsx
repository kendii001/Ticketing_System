"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Search, CalendarIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { getEvents } from "@/app/services/eventService";
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

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

function EventContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [date, setDate] = useState<Date | undefined>();
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Data States
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });

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
    { name: "All Categories" },
    { name: "Music" },
    { name: "Art & Culture" },
    { name: "Business" },
    { name: "Sports" },
    { name: "Theatre" },
    { name: "Comedy" },
    { name: "Festivals" },
    { name: "Conferences" },
    { name: "Family" },
    { name: "Technology" },
  ];

  const fetchEventsData = async (params: URLSearchParams) => {
    setLoading(true);

    const queryParams = new URLSearchParams(params.toString());
    queryParams.set("status", "published");

    // Ensure default pagination parameters exist
    if (!queryParams.has("page")) queryParams.set("page", "1");
    if (!queryParams.has("limit")) queryParams.set("limit", "9");

    try {
      // Delegate API request to eventService
      const data = await getEvents(queryParams);

      if (data.success) {
        setEvents(data.events || []);

        setPagination({
          page: Number(data.pagination?.page || queryParams.get("page") || 1),
          limit: Number(data.pagination?.limit || queryParams.get("limit") || 9),
          total: Number(data.pagination?.total || data.events?.length || 0),
          totalPages: Number(data.pagination?.totalPages || 1),
        });
      }
    } catch (error) {
      console.error("Failed to load events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentQuery = searchParams.get("q") || "";
    const currentCountry = searchParams.get("country") || "All Countries";
    const currentDate = searchParams.get("date");

    setQuery(currentQuery);
    setCountry(currentCountry);
    setDate(currentDate ? new Date(currentDate) : undefined);

    fetchEventsData(searchParams);
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset back to page 1 on search change
    params.set("page", "1");

    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }

    if (country !== "All Countries") {
      params.set("country", country);
    } else {
      params.delete("country");
    }

    if (date) {
      params.set("date", format(date, "yyyy-MM-dd"));
    } else {
      params.delete("date");
    }

    router.push(`/events?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/events?${params.toString()}`);
  };

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit.toString());
    params.set("page", "1");
    router.push(`/events?${params.toString()}`);
  };

  const createCategoryLink = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (categoryName === "All Categories") {
      params.delete("category");
    } else {
      params.set("category", categoryName);
    }
    return `/events?${params.toString()}`;
  };

  return (
    <div className="w-full px-4 py-8">
      {/* Search Bar Block */}
      <div className="rounded-2xl shadow-xl p-5 border bg-white">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <h1 className="text-2xl font-bold text-pink-600 whitespace-nowrap">
            ShereheSasa
          </h1>

          {/* Search Input */}
          <div className="flex flex-1 items-center border rounded-xl px-4 w-full">
            <Search className="h-5 w-5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full p-3 outline-none bg-transparent text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {/* Country Selector */}
          <select
            className="border rounded-xl bg-white p-3 lg:w-56 w-full text-sm outline-none"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Date Picker */}
          <div className="relative w-full lg:w-60">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger className="inline-flex w-full items-center justify-start rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50">
                <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
                <span className="truncate">
                  {date ? format(date, "PPP") : "Select Date"}
                </span>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setPopoverOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            {date && (
              <button
                onClick={() => setDate(undefined)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Clear date"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Trigger */}
          <button
            onClick={handleSearch}
            className="w-100 lg:w-auto rounded-xl bg-pink-600 px-8 py-3 font-semibold text-white hover:bg-pink-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="mt-6 border-y border-gray-200">
        <nav className="flex items-center justify-between gap-8 px-4 py-4 overflow-x-auto whitespace-nowrap">
          {categories.map((category) => {
            const currentCat = searchParams.get("category");
            const isActive =
              currentCat === category.name ||
              (!currentCat && category.name === "All Categories");

            return (
              <Link
                key={category.name}
                href={createCategoryLink(category.name)}
                className={`flex items-center gap-2 font-medium transition shrink-0 ${
                  isActive
                    ? "text-pink-600 font-bold border-b-2 border-pink-600 pb-1"
                    : "text-gray-700 hover:text-pink-600"
                }`}
              >
                <span>{category.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Event List Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Upcoming Events
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:inline">Per page:</span>
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="text-sm border rounded-lg p-1.5 bg-white text-gray-700 outline-none"
            >
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500 py-12 text-center">Loading events...</p>
        ) : events.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
            No published events found matching your criteria.
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-700">
                      {event.category}
                    </span>
                    <span className="text-xs uppercase tracking-wide font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {event.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-1.5 text-sm text-gray-600 border-t pt-3">
                    <p>
                      <span className="font-medium text-gray-900">Date:</span>{" "}
                      {event.event_date ? format(new Date(event.event_date), "PPP") : "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Time:</span>{" "}
                      {event.event_time}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Venue:</span>{" "}
                      {event.venue}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">
                        Organizer:
                      </span>{" "}
                      {event.organizer_name}
                    </p>
                    <p className="text-pink-600 font-semibold mt-2">
                      KSh {event.price?.toLocaleString()}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600">
                  Showing page <span className="font-semibold">{pagination.page}</span> of{" "}
                  <span className="font-semibold">{pagination.totalPages}</span>
                </p>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="hidden md:flex items-center space-x-1">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                            pagination.page === pageNum
                              ? "bg-pink-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                    className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Event() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-gray-500">Loading events...</div>
      }
    >
      <EventContent />
    </Suspense>
  );
}