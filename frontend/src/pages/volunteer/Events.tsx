import React, { useEffect, useState } from "react";
import { CalendarDays, MapPin, Star } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  status?: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export function VolunteerEventPage() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!userId || !token) {
    return <div className="text-center py-20 text-gray-600">Utilisateur non authentifié.</div>;
  }

  // LocalStorage Keys
  const favoriteKey = `favoriteEvents-${userId}`;
  const inscribedKey = `inscribedEvents-${userId}`;

  const [favoriteEvents, setFavoriteEvents] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(favoriteKey);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [inscribedEvents, setInscribedEvents] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(inscribedKey);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [showDialog, setShowDialog] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [alreadyInscribed, setAlreadyInscribed] = useState(false);

  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<Set<string>>(new Set());
  const [loadingEnroll, setLoadingEnroll] = useState(false);

  const [dateFilter, setDateFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch enrollments
  const fetchEnrollments = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/enrollments/volunteer/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch enrollments");
      const data: { eventId: string }[] = await res.json();
      const enrolledIds = new Set(data.map((e) => e.eventId));
      setEnrollments(enrolledIds);
    } catch (error) {
      console.error("Error loading enrollments:", error);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // Enroll
const handleEnroll = async (eventId: string, eventTitle: string) => {
  if (enrollments.has(eventId)) {
    setSelectedTitle(eventTitle);
    setAlreadyInscribed(true);
    return;
  }

  if (!token || !userId) {
    alert("Utilisateur non authentifié");
    return;
  }

  setLoadingEnroll(true);
  try {
    const payload = { userId, eventId };
    console.log("Payload inscription:", payload);

    const res = await fetch(`${BACKEND_URL}/enrollments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to enroll: ${res.status} ${errText}`);
    }

    setEnrollments((prev) => new Set(prev).add(eventId));
    setSelectedTitle(eventTitle);
    setShowDialog(true);
  } catch (error) {
    console.error("Erreur inscription :", error);
    alert("Erreur lors de l'inscription");
  } finally {
    setLoadingEnroll(false);
  }
};


  // Save to localStorage when favorites or inscribed change
  useEffect(() => {
    localStorage.setItem(favoriteKey, JSON.stringify(Array.from(favoriteEvents)));
  }, [favoriteEvents]);

  useEffect(() => {
    localStorage.setItem(inscribedKey, JSON.stringify(Array.from(inscribedEvents)));
  }, [inscribedEvents]);

  // Fetch Events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/event/get?volunteerId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error(error);
      alert("Échec du chargement des événements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Apply Filters
  useEffect(() => {
    let filtered = events;

    if (dateFilter) {
      filtered = filtered.filter((event) =>
        new Date(event.date).toISOString().split("T")[0] === dateFilter
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((event) => event.status === statusFilter);
    }

    setFilteredEvents(filtered);
  }, [dateFilter, locationFilter, statusFilter, events]);

  const toggleFavorite = (eventId: string) => {
    setFavoriteEvents((prev) => {
      const newSet = new Set(prev);
      newSet.has(eventId) ? newSet.delete(eventId) : newSet.add(eventId);
      return newSet;
    });
  };

  // Render
  return (
    <div className="max-w-3xl mx-auto px-0 py-5">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Vos événements assignés
      </h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Lieu"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmé</option>
          <option value="cancelled">Annulé</option>
        </select>
      </div>

      {/* Events */}
      {loading ? (
        <p className="text-center text-gray-500">Chargement des événements...</p>
      ) : filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">Aucun événement assigné.</p>
      ) : (
        <div className="h-[600px] snap-y snap-mandatory space-y-20 scrollbar-hide px-0">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="snap-start bg-white dark:bg-gray-800 border-2 border-black-600 dark:border-gray-700 rounded-3xl overflow-hidden hover:shadow-4xl hover:scale-[1.01] transition-transform duration-600 flex flex-col justify-between"
            >
              {event.image && (
                <img src={event.image} alt={event.title} className="w-full h-45 object-cover" />
              )}
              <div className="p-5 bg-purple-200 dark:bg-purple-900 space-y-3 flex-grow">
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-200 flex items-center justify-between">
                  {event.title}
                  <button
                    onClick={() => toggleFavorite(event._id)}
                    aria-label={favoriteEvents.has(event._id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                    title={favoriteEvents.has(event._id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                    className="ml-2 transition"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        favoriteEvents.has(event._id)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </h2>
                <p className="text-black-600 dark:text-gray-300">{event.description}</p>
                <div className="flex items-center text-sm text-black-500 dark:text-gray-400 gap-2">
                  <CalendarDays className="w-5 h-5 text-purple-500" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-black-500 dark:text-gray-400 gap-2">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  {event.location}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 px-5 pt-3 h-[55px] border-t bg-gray-300 dark:bg-gray-700 rounded-b-3xl">
                <button
                  className="bg-purple-700 text-white px-2 py-1 h-[30px] rounded hover:bg-purple-800 transition"
                  onClick={() => handleEnroll(event._id, event.title)}
                  disabled={loadingEnroll}
                >
                  {loadingEnroll ? "Enregistrement..." : "S'inscrire"}
                </button>
                <button
                  className="text-purple-700 dark:text-purple-300 font-semibold hover:underline"
                  onClick={() => alert(`Voir plus de détails pour ${event.title}`)}
                >
                  Voir plus
                </button>
              </div>
            </div>
          ))}

          {/* Success Dialog */}
          <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-green-600">Inscription réussie !</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="text-center">
                Vous êtes maintenant inscrit à <strong>{selectedTitle}</strong>.
              </div>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setShowDialog(false)}>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Already Inscribed Dialog */}
          <AlertDialog open={alreadyInscribed} onOpenChange={setAlreadyInscribed}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-600">Déjà inscrit</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="text-center">
                Vous êtes déjà inscrit à <strong>{selectedTitle}</strong>.
              </div>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setAlreadyInscribed(false)}>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
