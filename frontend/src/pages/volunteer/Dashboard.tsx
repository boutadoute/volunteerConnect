
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle,
  Settings as SettingsIcon,
  Star,
  Award,
  MessageCircle,
  MapPin,
} from "lucide-react";

type Event = {
  _id: string;
  title: string;
  date: string;
  location?: string;
  completed: boolean;
};

export function VolunteerDashboard() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Event[]>([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [notifications, setNotifications] = useState<string[]>([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

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

        const favIds =
          userId && localStorage.getItem(`favoriteEvents-${userId}`)
            ? JSON.parse(localStorage.getItem(`favoriteEvents-${userId}`) || "[]")
            : [];
        const favEvents = data.filter((e: Event) => favIds.includes(e._id));
        setFavorites(favEvents);

        const completedEvents = data.filter((e: Event) => e.completed);
        setPoints(completedEvents.length * 10);

        const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
        setFeedbackCount(feedbacks.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const assignedCount = events.length;
  const completedEvents = events.filter((e) => e.completed);
  const completedCount = completedEvents.length;
  const nextEvent = events
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/notifications/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setNotifications(data);
        } catch (err) {
          console.error("Failed to load notifications", err);
        }
      };

      fetchNotifications();
    }, []);



  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
        Bienvenue, {user?.name || "Bénévole"} 
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Voici un aperçu de votre activité bénévole</p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-purple-600">{assignedCount}</p>
          <p className="text-gray-600 dark:text-gray-300">Événements assignés</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-green-600">{completedCount}</p>
          <p className="text-gray-600 dark:text-gray-300">Historique de participation</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-blue-600">
            {nextEvent ? new Date(nextEvent.date).toLocaleDateString() : "Aucun"}
          </p>
          <p className="text-gray-600 dark:text-gray-300">Prochain événement</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <Award className="mx-auto mb-1 text-yellow-400 w-8 h-8" />
          <p className="text-2xl font-bold text-yellow-500">{points}</p>
          <p className="text-gray-600 dark:text-gray-300">Points de bénévolat</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <MessageCircle className="mx-auto mb-1 text-indigo-500 w-8 h-8" />
          <p className="text-2xl font-bold text-indigo-600">{feedbackCount}</p>
          <p className="text-gray-600 dark:text-gray-300">Feedback donnés</p>
        </div>
      </div>

      <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">
          Activités favorites ⭐
        </h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            Vous n'avez pas encore d'activités favorites.
          </p>
        ) : (
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {favorites.map((event) => (
              <Link to={`/volunteer/events/${event._id}`} key={event._id}>
                <li className="cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 shadow-sm hover:bg-purple-50 dark:hover:bg-purple-900 transition">
                  <p className="text-lg font-bold text-purple-700 dark:text-purple-200 mb-1">
                    {event.title}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-2 mb-1">
                    <CalendarDays className="w-4 h-4 text-purple-500" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-2">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    {event.location || "Lieu inconnu"}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-green-600">Vos participations récentes</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : completedEvents.length === 0 ? (
          <p className="text-gray-500">Vous n'avez pas encore complété d'événements.</p>
        ) : (
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {completedEvents
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 5)
              .map((event) => (
                <li
                  key={event._id}
                  className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{event.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <CheckCircle className="text-green-500 w-6 h-6" />
                </li>
              ))}
          </ul>
        )}
      </div>


            {notifications.length > 0 && (
              <div className="mt-8 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  Notifications récentes
                </h2>
                              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {notifications.map((note, i) => (
                  <li key={i}>{note.message}</li> 
                ))}
              </ul>
              </div>
            )}

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
    </div>
  );
}




















// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   CalendarDays,
//   CheckCircle,
//   Settings as SettingsIcon,
//   Star,
//   Award,
//   MessageCircle,
//   MapPin
// } from "lucide-react";

// type Event = {
//   _id: string;
//   title: string;
//   date: string;
//   completed: boolean;
// };

// export function VolunteerDashboard() {
//   const [user, setUser] = useState<{ name: string } | null>(null);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState<Event[]>([]);
//   const [feedbackCount, setFeedbackCount] = useState(0);
//   const [points, setPoints] = useState(0);

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     // تحميل الأحداث
//     const fetchEvents = async () => {
//       if (!token || !userId) return;

//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}/event/get?volunteerId=${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (!res.ok) throw new Error("Failed to fetch events");

//         const data = await res.json();
//         setEvents(data);

//         // نفترض أن الأحداث المفضلة محفوظة في localStorage حسب _id
//         const favIds = JSON.parse(localStorage.getItem("favoriteEvents") || "[]") as string[];
//         const favEvents = data.filter((e: Event) => favIds.includes(e._id));
//         setFavorites(favEvents);

//         // افتراض: نقاط المتطوع هي عدد الأحداث المكتملة * 10 (يمكن تغيرها حسب المنطق)
//         const completedEvents = data.filter((e: Event) => e.completed);
//         setPoints(completedEvents.length * 10);

//         // افتراض: عدد التعليقات أو الملاحظات من API أو localStorage
//         const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
//         setFeedbackCount(feedbacks.length);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const assignedCount = events.length;
//   const completedEvents = events.filter((e) => e.completed);
//   const completedCount = completedEvents.length;
//   const nextEvent = events.find((e) => new Date(e.date) > new Date());

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
//         Bienvenue, {user?.name || "Bénévole"} 👋
//       </h1>
//       <p className="text-gray-600 dark:text-gray-300 mb-6">Voici un aperçu de votre activité bénévole</p>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
//         <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
//           <p className="text-2xl font-bold text-purple-600">{assignedCount}</p>
//           <p className="text-gray-600 dark:text-gray-300">Événements assignés</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
//           <p className="text-2xl font-bold text-green-600">{completedCount}</p>
//           <p className="text-gray-600 dark:text-gray-300">Historique de participation</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
//           <p className="text-2xl font-bold text-blue-600">
//             {nextEvent ? new Date(nextEvent.date).toLocaleDateString() : "Aucun"}
//           </p>
//           <p className="text-gray-600 dark:text-gray-300">Prochain événement</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
//           <Award className="mx-auto mb-1 text-yellow-400 w-8 h-8" />
//           <p className="text-2xl font-bold text-yellow-500">{points}</p>
//           <p className="text-gray-600 dark:text-gray-300">Points de bénévolat</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
//           <MessageCircle className="mx-auto mb-1 text-indigo-500 w-8 h-8" />
//           <p className="text-2xl font-bold text-indigo-600">{feedbackCount}</p>
//           <p className="text-gray-600 dark:text-gray-300">Feedback donnés</p>
//         </div>
//       </div>

//      {/* Favoris */}
//                 <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//                 <h2 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">
//                     Activités favorites ⭐
//                 </h2>

//                 {favorites.length === 0 ? (
//                     <p className="text-gray-500 dark:text-gray-400">
//                     Vous n'avez pas encore d'activités favorites.
//                     </p>
//                 ) : (
//                     <ul className="space-y-4 max-h-64 overflow-y-auto">
//                     {favorites.map((event) => (
//                         <Link to={`/volunteer/events/${event._id}`} key={event._id}>
//                         <li className="cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 shadow-sm hover:bg-purple-50 dark:hover:bg-purple-900 transition">
//                             <p className="text-lg font-bold text-purple-700 dark:text-purple-200 mb-1">
//                             {event.title}
//                             </p>
//                             <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-2 mb-1">
//                             <CalendarDays className="w-4 h-4 text-purple-500" />
//                             {new Date(event.date).toLocaleDateString()}
//                             </div>
//                             <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-2">
//                             <MapPin className="w-4 h-4 text-purple-500" />
//                             {event.location}
//                             </div>
//                         </li>
//                         </Link>
//                     ))}
//                     </ul>
//                 )}
//                 </div>


//       {/* Recent Completed Events List */}
//       <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//         <h2 className="text-xl font-semibold mb-4 text-green-600">Vos participations récentes</h2>
//         {loading ? (
//           <p>Chargement...</p>
//         ) : completedEvents.length === 0 ? (
//           <p className="text-gray-500">Vous n'avez pas encore complété d'événements.</p>
//         ) : (
//           <ul className="space-y-3 max-h-60 overflow-y-auto">
//             {completedEvents.slice(-5).map((event) => (
//               <li
//                 key={event._id}
//                 className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
//               >
//                 <div>
//                   <p className="font-semibold text-gray-900 dark:text-gray-100">{event.title}</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     {new Date(event.date).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <CheckCircle className="text-green-500 w-6 h-6" />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <Link to="/volunteer/events">
//           <div className="bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition rounded-xl p-4 text-center cursor-pointer">
//             <CalendarDays className="w-6 h-6 mx-auto text-purple-700 dark:text-purple-300 mb-2" />
//             <p className="text-lg font-semibold text-purple-700 dark:text-purple-300">Mes événements</p>
//           </div>
//         </Link>

//         <Link to="/settings">
//           <div className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition rounded-xl p-4 text-center cursor-pointer">
//             <SettingsIcon className="w-6 h-6 mx-auto text-gray-700 dark:text-gray-200 mb-2" />
//             <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Mon profil</p>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }
