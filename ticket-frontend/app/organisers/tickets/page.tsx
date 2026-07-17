"use client";

import { useState } from "react";
import { Search, Ticket, CheckCircle, Clock } from "lucide-react";

export default function TicketsPage() {
  const [search, setSearch] = useState("");

  const tickets = [
    {
      id: 1,
      attendee: "John Mwangi",
      email: "john@gmail.com",
      event: "Nairobi Music Festival",
      ticketType: "VIP",
      price: 3000,
      status: "Checked In",
    },
    {
      id: 2,
      attendee: "Faith Achieng",
      email: "faith@gmail.com",
      event: "Tech Summit Kenya",
      ticketType: "Regular",
      price: 1000,
      status: "Pending",
    },
    {
      id: 3,
      attendee: "Brian Kiptoo",
      email: "brian@gmail.com",
      event: "Food Festival",
      ticketType: "VIP",
      price: 2500,
      status: "Checked In",
    },
    {
      id: 4,
      attendee: "Grace Wanjiru",
      email: "grace@gmail.com",
      event: "Business Expo",
      ticketType: "Regular",
      price: 1500,
      status: "Pending",
    },
  ];

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.attendee.toLowerCase().includes(search.toLowerCase()) ||
      ticket.event.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-[#CC338B] mb-8">
          Ticket Management
        </h1>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div className="bg-pink-100 p-3 rounded-full">
              <Ticket className="text-[#CC338B]" size={28} />
            </div>

            <div>
              <p className="text-gray-500">Tickets Sold</p>
              <h2 className="text-2xl font-bold">{tickets.length}</h2>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="text-green-600" size={28} />
            </div>

            <div>
              <p className="text-gray-500">Checked In</p>
              <h2 className="text-2xl font-bold">
                {tickets.filter((t) => t.status === "Checked In").length}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="text-yellow-600" size={28} />
            </div>

            <div>
              <p className="text-gray-500">Pending</p>
              <h2 className="text-2xl font-bold">
                {tickets.filter((t) => t.status === "Pending").length}
              </h2>
            </div>
          </div>

        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow p-5 mb-6">

          <div className="relative">

            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search attendee or event..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg py-3 pl-10 pr-4"
            />

          </div>

        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="text-left p-4">Attendee</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Event</th>
                <th className="text-left p-4">Ticket</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Status</th>
              </tr>

            </thead>

            <tbody>

              {filteredTickets.map((ticket) => (

                <tr
                  key={ticket.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {ticket.attendee}
                  </td>

                  <td className="p-4">
                    {ticket.email}
                  </td>

                  <td className="p-4">
                    {ticket.event}
                  </td>

                  <td className="p-4">
                    {ticket.ticketType}
                  </td>

                  <td className="p-4">
                    KES {ticket.price.toLocaleString()}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ticket.status === "Checked In"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {ticket.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}