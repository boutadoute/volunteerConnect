import React, { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export function VolunteerEventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchEvents = async () => {
    if (!token || !userId) return alert("User not authenticated");

    try {
      setLoading(true);
      const res = await fetch(
        `${BACKEND_URL}/event/get?volunteerId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

return (
  <div className="max-w-3xl  mx-auto px-0 py-5">
    <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
      Vos événements assignés
    </h1>

    {loading ? (
      <p className="text-center text-gray-500">Chargement des événements...</p>
    ) : events.length === 0 ? (
      <p className="text-center text-gray-500">Aucun événement assigné.</p>
    ) : (
      <div className="h-[600px]    snap-y snap-mandatory space-y-20 scrollbar-hide px-0">
              {events.map((event) => (
        <div
          key={event._id}
          className="snap-start w-220 bg-white dark:bg-gray-800 border-2 border-black-600 dark:border-gray-700 rounded-3xl overflow-hidden hover:shadow-4xl hover:scale-[1.01] transition-transform duration-600 flex flex-col justify-between"
        >
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-45 object-cover"
            />
          )}

          <div className="p-5 bg-purple-200 dark:bg-purple-900 space-y-3 flex-grow">
            <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-200">
              {event.title}
            </h2>

            <p className="text-black-600 dark:text-gray-300 text-base leading-relaxed">
              {event.description}
            </p>

            <div className="flex items-center text-sm text-black-500 dark:text-gray-400 gap-2">
              <CalendarDays className="w-5 h-5 text-purple-500" />
              {new Date(event.date).toLocaleDateString()}
            </div>

            <div className="flex items-center text-sm text-black-500 dark:text-gray-400 gap-2">
              <MapPin className="w-5 h-5 text-purple-500" />
              {event.location}
            </div>
          </div>

          <div className="flex justify-end gap-4 px-5 pt-3 h-[55px] border-t bg-gray-300 dark:bg-gray-700 rounded-b-3xl">
            <button
              className="bg-purple-700 text-white text-base px-2 py-1 h-[30px] rounded hover:bg-purple-800 transition"
              onClick={() => alert(`Inscription à ${event.title}`)}
            >
              S'inscrire
            </button>
            <button
              className="text-base text-purple-700 dark:text-purple-300 font-semibold hover:underline"
              onClick={() => alert(`Voir plus de détails pour ${event.title}`)}
            >
              Voir plus
            </button>
          </div>
        </div>
      ))}

      </div>
    )}
  </div>
);

}















// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// } from "@/components/ui/carousel";
// import { CalendarDays, MapPin } from "lucide-react";
// import { useEffect, useState } from "react";

// type Event = {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   image: string;
// };

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// export function VolunteerEventPage() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   const fetchEvents = async () => {
//     if (!token || !userId) return alert("User not authenticated");
//     try {
//       setLoading(true);
//       const res = await fetch(`${BACKEND_URL}/event/get?volunteerId=${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setEvents(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   return (
//     <div className="max-w-xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         Vos événements assignés
//       </h1>

//       {loading ? (
//         <p className="text-center">Chargement...</p>
//       ) : (
//         <Carousel
//           orientation="vertical"
//           className="relative h-[500px] w-full overflow-hidden"
//         >
//           <CarouselContent className="flex flex-col snap-y snap-mandatory h-full overflow-y-scroll">
//             {events.map((event) => (
//               <CarouselItem
//                 key={event._id}
//                 className="snap-start p-2 flex-shrink-0 h-full"
//               >
//                 <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col">
//                   {event.image && (
//                     <img
//                       src={event.image}
//                       alt="event"
//                       className="w-full h-40 object-cover"
//                     />
//                   )}
//                   <div className="p-4 flex-grow flex flex-col justify-between">
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-800">
//                         {event.title}
//                       </h2>
//                       <p className="text-sm text-gray-600 mt-2">
//                         {event.description}
//                       </p>
//                     </div>
//                     <div className="mt-4 text-sm text-gray-500 space-y-1">
//                       <div className="flex items-center gap-2">
//                         <CalendarDays className="w-4 h-4" />
//                         {new Date(event.date).toLocaleDateString()}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <MapPin className="w-4 h-4" />
//                         {event.location}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           {/* Positioning the controls vertically */}
//           <div className="absolute top-2 right-2 z-10">
//             <CarouselPrevious className="rotate-90" />
//           </div>
//           <div className="absolute bottom-2 right-2 z-10">
//             <CarouselNext className="rotate-90" />
//           </div>
//         </Carousel>
//       )}
//     </div>
//   );
// }
