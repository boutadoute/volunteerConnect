import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
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
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export function VolunteerEventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const [inscribedEvents, setInscribedEvents] = useState<Set<string>>(() => {
    const stored = localStorage.getItem("inscribedEvents");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showAlreadyDialog, setShowAlreadyDialog] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/event/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, token]);

  useEffect(() => {
    localStorage.setItem("inscribedEvents", JSON.stringify(Array.from(inscribedEvents)));
  }, [inscribedEvents]);

 
  const handleSubscribe = () => {
    if (!event) return;
    if (inscribedEvents.has(event._id)) {
      setShowAlreadyDialog(true);
    } else {
      setInscribedEvents(prev => new Set(prev).add(event._id));
      setShowSuccessDialog(true);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Chargement...</div>;
  }

  if (!event) {
    return <div className="text-center mt-10 text-red-500">Événement introuvable</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-4">
        {event.title}
      </h1>

      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="rounded-xl mb-6 w-full max-h-[300px] object-cover"
        />
      )}

      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 mb-4">
        <CalendarDays className="w-5 h-5 text-purple-600" />
        {new Date(event.date).toLocaleDateString()}
      </div>

      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 mb-6">
        <MapPin className="w-5 h-5 text-purple-600" />
        {event.location}
      </div>

      <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg mb-8">
        {event.description}
      </p>

      <button
        onClick={handleSubscribe}
        className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
      >
        S'inscrire
      </button>

      {/* Dialog succès inscription */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-600">Inscription réussie !</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="text-center">
            Vous êtes maintenant inscrit à <strong>{event.title}</strong>.
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog déjà inscrit */}
      <AlertDialog open={showAlreadyDialog} onOpenChange={setShowAlreadyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600"> Déjà inscrit</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="text-center">
            Vous êtes déjà inscrit à <strong>{event.title}</strong>.
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlreadyDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
