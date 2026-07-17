"use client";

import { DollarSign, Ticket, TrendingUp, Calendar } from "lucide-react";

export default function SalesPage() {
  const sales = [
    {
      id: 1,
      event: "Nairobi Music Festival",
      date: "20 Jul 2026",
      ticketsSold: 320,
      revenue: 960000,
      status: "Completed",
    },
    {
      id: 2,
      event: "Tech Summit Kenya",
      date: "28 Jul 2026",
      ticketsSold: 150,
      revenue: 450000,
      status: "Ongoing",
    },
    {
      id: 3,
      event: "Food Festival",
      date: "10 Aug 2026",
      ticketsSold: 210,
      revenue: 525000,
      status: "Ongoing",
    },
  ];

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.revenue,
    0
  );

  const totalTickets = sales.reduce(
    (sum, sale) => sum + sale.ticketsSold,
    0
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-[#CC338B] mb-8">
          Sales Dashboard
        </h1>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="text-green-600" size={28} />
            </div>

            <div>
              <p className="text-gray-500">Total Revenue</p>
              <h2 className="text-2xl font-bold">
                KES {totalRevenue.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Ticket className="text-blue-600" size={28} />
            </div>

            <div>
              <p className="text-gray-500">Tickets Sold</p>
              <h2 className="text-2xl font-bold">
                {totalTickets}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div className="bg-pink-100 p-3 rounded-full">
              <TrendingUp className="text-[#CC338B]" size={28} />
            </div>

            <div>
              <p className="text-gray-500">Events</p>
              <h2 className="text-2xl font-bold">
                {sales.length}
              </h2>
            </div>
          </div>

        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              Event Sales
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="text-left p-4">Event</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Tickets Sold</th>
                <th className="text-left p-4">Revenue</th>
                <th className="text-left p-4">Status</th>
              </tr>

            </thead>

            <tbody>

              {sales.map((sale) => (

                <tr
                  key={sale.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {sale.event}
                  </td>

                  <td className="p-4 flex items-center gap-2">
                    <Calendar size={16} />
                    {sale.date}
                  </td>

                  <td className="p-4">
                    {sale.ticketsSold}
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    KES {sale.revenue.toLocaleString()}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        sale.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {sale.status}
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