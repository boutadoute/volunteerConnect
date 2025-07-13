
import React, { useEffect, useState } from "react";
import { CalendarDays, Megaphone, BarChartBig } from "lucide-react"; 


type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  adminId?: string;
  volunteerId?: string;
};

type EnrollmentRequest = {
  _id: string;
  volunteerId: string;
  volunteerName: string;
  eventTitle: string;
  status: "pending" | "approved" | "rejected";
};

type VolunteerProfile = {
  fullName: string;
  email: string;
  phone_number: string;
  city?: string;
  participationCount?: number;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export function AssociateDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const [enrollmentRequests, setEnrollmentRequests] = useState<EnrollmentRequest[]>([]);
  const [volunteerStatus, setVolunteerStatus] = useState({ active: 0, pendingApprovals: 0, total: 0 });
  const [notifications, setNotifications] = useState<string[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingVolunteer, setLoadingVolunteer] = useState(false);

  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user") || "{}")?.role;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchEvents();
    fetchEnrollmentRequests();
    setVolunteerStatus({ active: 35, pendingApprovals: 3, total: 50 });
    setNotifications([
      "Event 1 canceled",
      "New message from Admin",
      "Volunteer request pending",
    ]);
  }, []);

  const fetchEvents = async () => {
    if (!token || !userId || !role) return;
    try {
      const res = await fetch(`${BACKEND_URL}/event/get?adminId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch events");
      const data: Event[] = await res.json();
      setEvents(data);
      setRecentActivity(
        data
          .slice()
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)
          .map(ev => `Event: "${ev.title}" on ${new Date(ev.date).toLocaleDateString()}`)
      );
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };


  const fetchEnrollmentRequests = async () => {
  setLoadingRequests(true);
  try {
    const res = await fetch(`${BACKEND_URL}/enrollments/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch enrollment requests");
    const data: EnrollmentRequest[] = await res.json();
    setEnrollmentRequests(data);
  } catch (error) {
    console.error("Error fetching enrollment requests:", error);
  } finally {
    setLoadingRequests(false);
  }
};


const handleUpdateStatus = async (id: string, action: "approve" | "reject") => {
  try {
    // 1. Update the enrollment status
    const res = await fetch(`${BACKEND_URL}/enrollments/${id}/${action}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Status update failed");

    // 2. Get enrollment info
    const enrollmentRes = await fetch(`${BACKEND_URL}/enrollments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const enrollment = await enrollmentRes.json();

    const message =
      action === "approve"
        ? ` Votre demande de participation à l’événement « ${enrollment.eventTitle} » a été acceptée.`
        : ` Votre demande de participation à l’événement « ${enrollment.eventTitle} » a été refusée.`;

    // 3. Send notification to volunteer
    await fetch(`${BACKEND_URL}/notifications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: enrollment.volunteerId,
        message,
      }),
    });

    fetchEnrollmentRequests(); 
  } catch (error) {
    console.error("Error updating status or sending notification:", error);
  }
};



  const fetchVolunteerInfo = async (volunteerId: string) => {
    try {
      setLoadingVolunteer(true);
      const res = await fetch(`${BACKEND_URL}/api/volunteers/volunteers/${volunteerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Volunteer not found");
      const data = await res.json();
      setSelectedVolunteer(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error loading volunteer info:", error);
    } finally {
      setLoadingVolunteer(false);
    }
  };



  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 bg-white dark:bg-gray-900 min-h-screen">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-lg shadow">
          <h4 className="text-sm">Total Events</h4>
          <p className="text-2xl font-bold">{events.length}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg shadow">
          <h4 className="text-sm">Active Volunteers</h4>
          <p className="text-2xl font-bold">{volunteerStatus.active}</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg shadow">
          <h4 className="text-sm">Pending Requests</h4>
          <p className="text-2xl font-bold">{volunteerStatus.pendingApprovals}</p>
        </div>
      </section>

      {/* Enrollment Requests */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Enrollment Requests</h2>
        {loadingRequests ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-3">
            {enrollmentRequests.map(({ _id, volunteerName, eventTitle, volunteerId, status }) => (
              <li key={_id} className="bg-purple-50 dark:bg-purple-900 p-4 rounded flex justify-between items-center">
                <span>
                  {volunteerName} asked to join <strong>{eventTitle}</strong>{" "}
                  {status === "pending" ? "(pending)" : status === "approved" ? "(approved)" : "(rejected)"}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => fetchVolunteerInfo(volunteerId)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Voir détails
                  </button>
                  {status === "pending" ? (
                    <>
                      <button onClick={() => handleUpdateStatus(_id, "approve")} className="bg-green-600 text-white px-3 py-1 rounded">Accepter</button>
                      <button onClick={() => handleUpdateStatus(_id, "reject")} className="bg-red-600 text-white px-3 py-1 rounded">Refuser</button>
                    </>
                  ) : (
                    <span className={`font-semibold ${status === "approved" ? "text-green-700" : "text-red-700"}`}>{status === "approved" ? "Accepté" : "Refusé"}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Volunteer Modal */}
      {showModal && selectedVolunteer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-30 h-full">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Détails du Bénévole</h3>
            <ul className="space-y-2 text-gray-800 dark:text-gray-200">
              <li><strong>Nom:</strong> {selectedVolunteer.fullName}</li>
              <li><strong>Email:</strong> {selectedVolunteer.email}</li>
              <li><strong>Téléphone:</strong> {selectedVolunteer.phone_number}</li>
              <li><strong>City:</strong> {selectedVolunteer.city || "Non disponible"}</li>
              {selectedVolunteer.participationCount !== undefined && (
                <li><strong>Événements Participés:</strong> {selectedVolunteer.participationCount}</li>
              )}
            </ul>
            <div className="mt-4 text-right">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">System Notifications</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          {notifications.map((note, i) => <li key={i}>{note}</li>)}
        </ul>
      </section>

      {/* Admin Tools */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-3">
        <h2 className="text-xl font-semibold mb-2">Admin Tools</h2>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2"><CalendarDays size={18} />Create New Event</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"><Megaphone size={18} />Send Announcement</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><BarChartBig size={18} />View Reports</button>
        </div>
      </section>
    </div>
  );
}
