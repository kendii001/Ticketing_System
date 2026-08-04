"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Stats {
  totalEvents: number;
  organizers: number;
  ticketsSold: number;
  revenue: number;
}

interface Organizer {
  id: number;
  name: string;
  email: string;
}

interface EventItem {
  id: number;
  title: string;
  status: string;
}

interface Payment {
  id: number;
  customer_name: string;
  event_title: string;
  amount: number;
  status: string;
}

export default function Dashboard() {
  const router = useRouter();

  const [stats, setStats] = useState<Stats | null>(null);
  const [pendingOrganizers, setPendingOrganizers] = useState<Organizer[]>([]);
  const [recentEvents, setRecentEvents] = useState<EventItem[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, organizersRes, eventsRes, paymentsRes] = await Promise.all([
        fetch(`/api/admin/stats`),
        fetch(`/api/admin/organizers/pending`),
        fetch(`/api/events`),
        fetch(`/api/admin/payments/recent`),
      ]);

      const statsData = await statsRes.json();
      const organizersData = await organizersRes.json();
      const eventsData = await eventsRes.json();
      const paymentsData = await paymentsRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (organizersData.success) setPendingOrganizers(organizersData.organizers);
      if (eventsData.success) setRecentEvents(eventsData.events.slice(0, 3));
      if (paymentsData.success) setPayments(paymentsData.payments);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const intervalId = window.setInterval(() => {
      fetchDashboardData();
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleApproveOrganizer = async (id: number) => {
    try {
      await fetch(`/api/admin/organizers/${id}/approve`, { method: "PATCH" });
      fetchDashboardData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectOrganizer = async (id: number) => {
    try {
      await fetch(`/api/admin/organizers/${id}/reject`, { method: "PATCH" });
      fetchDashboardData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">ShereheSasa</h2>

        <nav className="space-y-4">
          <Link href="/admin" className="block hover:text-cyan-400 cursor-pointer">
            Dashboard
          </Link>
          <Link href="/admin/events" className="block hover:text-cyan-400 cursor-pointer">
            Events
          </Link>
          <Link href="/admin/events/pending" className="block hover:text-cyan-400 cursor-pointer">
            Pending Events
          </Link>
          <Link href="/admin/organizers" className="block hover:text-cyan-400 cursor-pointer">
            Organizers
          </Link>
          <Link href="/admin/customers" className="block hover:text-cyan-400 cursor-pointer">
            Customers
          </Link>
          <Link href="/admin/payments" className="block hover:text-cyan-400 cursor-pointer">
            Payments
          </Link>
          <Link href="/admin/reports" className="block hover:text-cyan-400 cursor-pointer">
            Reports
          </Link>
          <Link href="/admin/categories" className="block hover:text-cyan-400 cursor-pointer">
            Categories
          </Link>
          <Link href="/admin/support" className="block hover:text-cyan-400 cursor-pointer">
            Support
          </Link>
          <Link href="/admin/settings" className="block hover:text-cyan-400 cursor-pointer">
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block text-left w-full hover:text-red-400 cursor-pointer"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here&apos;s what&apos;s happening on ShereheSasa.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading dashboard...</p>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-gray-500 text-sm">Total Events</h3>
                <p className="text-3xl font-bold mt-2">{stats?.totalEvents ?? 0}</p>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-gray-500 text-sm">Organizers</h3>
                <p className="text-3xl font-bold mt-2">{stats?.organizers ?? 0}</p>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-gray-500 text-sm">Tickets Sold</h3>
                <p className="text-3xl font-bold mt-2">{stats?.ticketsSold ?? 0}</p>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-gray-500 text-sm">Revenue</h3>
                <p className="text-3xl font-bold mt-2 text-green-600">
                  KSh {stats?.revenue?.toLocaleString() ?? 0}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow p-6 mb-10">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/admin/events/add"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg"
                >
                  Add Event
                </Link>

                <Link
                  href="/admin/reports"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
                >
                  View Reports
                </Link>

                <Link
                  href="/admin/organizers"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg"
                >
                  Organizers
                </Link>

                <Link
                  href="/admin/messages"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg"
                >
                  Messages
                </Link>
              </div>
            </div>

            {/* Recent Events & Pending Approvals */}
            <div className="grid lg:grid-cols-2 gap-8 mb-10">

              {/* Recent Events */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Events</h2>

                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Event</th>
                      <th className="text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentEvents.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="py-3 text-gray-400">
                          No events yet.
                        </td>
                      </tr>
                    ) : (
                      recentEvents.map((event) => (
                        <tr key={event.id} className="border-b last:border-b-0">
                          <td className="py-3">{event.title}</td>
                          <td
                            className={`font-medium ${
                              event.status === "published"
                                ? "text-green-600"
                                : event.status === "pending"
                                ? "text-yellow-600"
                                : "text-blue-600"
                            }`}
                          >
                            {event.status}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pending Approvals (Organizers) */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>

                <div className="space-y-4">
                  {pendingOrganizers.length === 0 ? (
                    <p className="text-gray-400">No pending organizers.</p>
                  ) : (
                    pendingOrganizers.map((organizer) => (
                      <div
                        key={organizer.id}
                        className="flex justify-between items-center border-b pb-3 last:border-b-0"
                      >
                        <span>{organizer.name}</span>

                        <div className="space-x-2">
                          <button
                            onClick={() => handleApproveOrganizer(organizer.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleRejectOrganizer(organizer.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Customer</th>
                    <th className="text-left">Event</th>
                    <th className="text-left">Amount</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-3 text-gray-400">
                        No payments yet.
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment) => (
                      <tr key={payment.id} className="border-b last:border-b-0">
                        <td className="py-3">{payment.customer_name}</td>
                        <td>{payment.event_title}</td>
                        <td>KSh {payment.amount.toLocaleString()}</td>
                        <td className="text-green-600">{payment.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

      </main>

    </div>
  );
}