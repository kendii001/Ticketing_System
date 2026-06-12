import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center">
            
            ShereheSasa
            
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">

            <Link


              href="/home"              
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              About Us
            </Link>

            <Link
              href="/pricing"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Pricing
            </Link>

            <Link
              href="/blog"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Blog
            </Link>

            <Link
              href="/help"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Help Center
            </Link>
          </div>

          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/events"
              className="px-5 py-2.5 rounded-lg border border-gray-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
            >
              Explore Events
            </Link>

            <Link
              href="/launch-event"
              className="px-5 py-2.5 rounded-lg bg-gray-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Launch An Event
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open navigation menu"
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
    </nav>
  );
}