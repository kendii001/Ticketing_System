"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Event() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [date, setDate] = useState<Date | undefined>();

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
    { name: "All Categories" },
    { name: "All Categories" },
    { name: "All Categories" },
    { name: "discover all" },
    { name: "Music" },
    { name: "Art & Culture", icon: "🎨" },
    { name: "Business", icon: "💼" },
    { name: "Sports", icon: "⚽" },
    { name: "Theatre", icon: "🎭" },
    { name: "Comedy", icon: "😂" },
    { name: "Festivals", icon: "🎉" },
    { name: "Conferences", icon: "🎓" },
    { name: "Family", icon: "❤️" },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.append("q", query);
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

    {/* Search Section */}
    <div className="rounded-2xl shadow-xl p-5">
      <div className="flex flex-col lg:flex-row gap-4 items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-pink-600 whitespace-nowrap">
          ShereheSasa
        </h1>

        {/* Search */}
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

        {/* Country */}
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

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
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
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="rounded-xl bg-pink-600 px-8 py-3 font-semibold text-white hover:bg-pink-700 transition"
        >
          Search
        </button>

      </div>
    </div>

    {/* Categories */}
    <div className="mt-6 border-y border-gray-200">
      <nav className="flex items-center justify-between gap-8 px-4 py-4 overflow-x-auto whitespace-nowrap">

        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/events?category=${category.name}`}
            className="flex items-center gap-2 text-gray-700 hover:text-pink-600 font-medium transition shrink-0"
          >
            {category.icon && (
              <span className="text-lg">{category.icon}</span>
            )}

            <span>{category.name}</span>
          </Link>
        ))}

      </nav>
    </div>

  </div>
);
}