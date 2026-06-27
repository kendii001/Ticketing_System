"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            ShereheSasa
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/home" className="text-gray-700 hover:text-indigo-600 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-600 font-medium">
              About Us
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-indigo-600 font-medium">
              Pricing
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-indigo-600 font-medium">
              Blog
            </Link>
            <Link href="/help" className="text-gray-700 hover:text-indigo-600 font-medium">
              Help Center
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/events"
              className="px-5 py-2.5 rounded-lg border border-gray-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
            >
              Explore Events
            </Link>

            <Link
            href="/contact"
            className="px-5 py-2.5 rounded-lg bg-gray-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Launch An Event
          </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-md px-6 pb-4 space-y-4">
          <Link href="/home" className="block text-gray-700">Home</Link>
          <Link href="/about" className="block text-gray-700">About Us</Link>
          <Link href="/pricing" className="block text-gray-700">Pricing</Link>
          <Link href="/blog" className="block text-gray-700">Blog</Link>
          <Link href="/help" className="block text-gray-700">Help Center</Link>

          <div className="pt-3 border-t space-y-3">
            <Link href="/events" className="block text-indigo-600 font-semibold">
              Explore Events
            </Link>
            <Link href="/launch-event" className="block text-gray-700 font-semibold">
              Launch An Event
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}