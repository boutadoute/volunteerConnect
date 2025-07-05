import React from "react";

export function AssociateDashboard() {
  // Sample data placeholders
  const upcomingEvents = [
    "Event 1: Beach Cleanup",
    "Event 2: Food Drive",
    "Event 3: Tree Planting",
  ];
  const volunteerStatus = {
    active: 35,
    pendingApprovals: 3,
    total: 50,
  };
  const enrollmentRequests = [
    { id: 1, volunteer: "Volunteer A", event: "Event 1" },
    { id: 2, volunteer: "Volunteer B", event: "Event 2" },
    { id: 3, volunteer: "Volunteer C", event: "Event 3" },
  ];
  const recentActivity = [
    "Volunteer X signed up for Event 1",
    "Event 2 details updated",
    "Volunteer Y canceled enrollment",
  ];
  const notifications = [
    "Event 1 canceled",
    "New message from Admin",
    "Volunteer request pending",
  ];

  // Handler placeholders
  const handleApprove = (id: number) => alert(`Approved request ${id}`);
  const handleReject = (id: number) => alert(`Rejected request ${id}`);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-purple-700">Associate Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Associate!</p>
        </div>
        <div>
          {/* Placeholder avatar */}
          <div className="w-12 h-12 rounded-full bg-purple-400 text-white flex items-center justify-center font-bold">
            A
          </div>
        </div>
      </header>

      {/* Top cards: Upcoming Events + Volunteer Status */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">My Upcoming Events</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {upcomingEvents.map((ev, i) => (
              <li key={i}>{ev}</li>
            ))}
          </ul>
          <button className="text-purple-700 font-semibold hover:underline">View All</button>
        </div>

        {/* Volunteer Status */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Volunteer Status</h2>
          <ul className="text-gray-700 space-y-1">
            <li>Active Volunteers: {volunteerStatus.active}</li>
            <li>Pending Approvals: {volunteerStatus.pendingApprovals}</li>
            <li>Total Volunteers: {volunteerStatus.total}</li>
          </ul>
          <button className="text-purple-700 font-semibold hover:underline">View Volunteers</button>
        </div>
      </section>

      {/* Enrollment Requests */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Enrollment Requests</h2>
        <ul className="space-y-3">
          {enrollmentRequests.map(({ id, volunteer, event }) => (
            <li key={id} className="flex items-center justify-between bg-purple-50 p-3 rounded">
              <span>
                {volunteer} requested to join {event}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleApprove(id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent Activity */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Recent Activity</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {recentActivity.map((activity, i) => (
            <li key={i}>{activity}</li>
          ))}
        </ul>
      </section>

      {/* Bottom grid: Notifications + Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Notifications</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {notifications.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Quick Actions</h2>
          <button className="bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition">
            Create New Event
          </button>
          <button className="bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition">
            Contact Volunteers
          </button>
          <button className="bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition">
            Export Reports
          </button>
        </div>
      </section>

      {/* Performance Overview */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Performance Overview</h2>
        {/* Placeholder progress bars */}
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-gray-800 mb-1">Volunteer Engagement</p>
            <div className="w-full bg-gray-200 rounded-full h-5">
              <div className="bg-purple-600 h-5 rounded-full" style={{ width: "70%" }} />
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Event Completion</p>
            <div className="w-full bg-gray-200 rounded-full h-5">
              <div className="bg-purple-600 h-5 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
