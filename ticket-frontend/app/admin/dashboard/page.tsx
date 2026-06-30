export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">
          ShereheSasa
        </h2>

        <nav className="space-y-4">
          <p className="hover:text-cyan-400 cursor-pointer">Dashboard</p>
          <p className="hover:text-cyan-400 cursor-pointer">Events</p>
          <p className="hover:text-cyan-400 cursor-pointer">Pending Events</p>
          <p className="hover:text-cyan-400 cursor-pointer">Organizers</p>
          <p className="hover:text-cyan-400 cursor-pointer">Customers</p>
          <p className="hover:text-cyan-400 cursor-pointer">Payments</p>
          <p className="hover:text-cyan-400 cursor-pointer">Reports</p>
          <p className="hover:text-cyan-400 cursor-pointer">Categories</p>
          <p className="hover:text-cyan-400 cursor-pointer">Support</p>
          <p className="hover:text-cyan-400 cursor-pointer">Settings</p>
          <p className="hover:text-red-400 cursor-pointer">Logout</p>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening on ShereheSasa.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Events</h3>
            <p className="text-3xl font-bold mt-2">125</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">Organizers</h3>
            <p className="text-3xl font-bold mt-2">42</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">Tickets Sold</h3>
            <p className="text-3xl font-bold mt-2">9,845</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">Revenue</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">
              KSh 2.3M
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg">
              Approve Events
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg">
              View Reports
            </button>

            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg">
              Manage Organizers
            </button>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg">
              Messages
            </button>
          </div>
        </div>

        {/* Recent Events & Pending Approvals */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          {/* Recent Events */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Recent Events
            </h2>

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Event</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-3">Tech Summit 2026</td>
                  <td className="text-green-600 font-medium">
                    Published
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Nairobi Marathon</td>
                  <td className="text-yellow-600 font-medium">
                    Pending
                  </td>
                </tr>

                <tr>
                  <td className="py-3">Music Festival</td>
                  <td className="text-blue-600 font-medium">
                    Draft
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Pending Approvals
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between items-center border-b pb-3">
                <span>Women in Tech Conference</span>

                <div className="space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded">
                    Approve
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Reject
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span>Food Festival</span>

                <div className="space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded">
                    Approve
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Reject
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Payments
          </h2>

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
              <tr className="border-b">
                <td className="py-3">Jackline</td>
                <td>Tech Summit</td>
                <td>KSh 2,000</td>
                <td className="text-green-600">Paid</td>
              </tr>

              <tr>
                <td className="py-3">Brian</td>
                <td>Music Festival</td>
                <td>KSh 1,500</td>
                <td className="text-green-600">Paid</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>

    </div>
  );
}