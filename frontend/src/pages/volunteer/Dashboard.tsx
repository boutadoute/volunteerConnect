import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle, Settings as SettingsIcon } from "lucide-react";

type Event = {
  _id: string;
  title: string;
  date: string;
  completed: boolean;
};

export function VolunteerDashboard() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchEvents = async () => {
      if (!token || !userId) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}/event/get?volunteerId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const assignedCount = events.length;
  const completedCount = events.filter((e) => e.completed).length;
  const nextEvent = events.find((e) => new Date(e.date) > new Date());

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
        Bienvenue, {user?.name || "Bénévole"} 👋
      </h1>
      <p className="text-gray-600 dark:text-gray-300">Voici un aperçu de votre activité bénévole</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-purple-600">{assignedCount}</p>
          <p className="text-gray-600 dark:text-gray-300">Événements assignés</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-green-600">{completedCount}</p>
          <p className="text-gray-600 dark:text-gray-300">Événements complétés</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-blue-600">
            {nextEvent ? new Date(nextEvent.date).toLocaleDateString() : "Aucun"}
          </p>
          <p className="text-gray-600 dark:text-gray-300">Prochain événement</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/volunteer/events">
          <div className="bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition rounded-xl p-4 text-center cursor-pointer">
            <CalendarDays className="w-6 h-6 mx-auto text-purple-700 dark:text-purple-300 mb-2" />
            <p className="text-lg font-semibold text-purple-700 dark:text-purple-300">Mes événements</p>
          </div>
        </Link>

        <Link to="/settings">
          <div className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition rounded-xl p-4 text-center cursor-pointer">
            <SettingsIcon className="w-6 h-6 mx-auto text-gray-700 dark:text-gray-200 mb-2" />
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Mon profil</p>
          </div>
        </Link>
      </div>

      {/* Announcement */}
      <div className="mt-10 bg-yellow-100 dark:bg-yellow-800 p-5 rounded-xl">
        <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">📢 Annonce</h3>
        <p className="text-sm text-yellow-900 dark:text-yellow-100">
          N'oubliez pas de confirmer votre présence à l’événement du{" "}
          <strong>15 Juillet à Tiznit</strong>. Merci pour votre engagement !
        </p>
      </div>
    </div>
  );
}
