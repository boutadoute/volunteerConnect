    // import { useNavigate } from "react-router-dom";
    // import { useEffect, useState } from "react";
    // import { LayoutDashboard, CalendarDays, Megaphone, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

    // interface User {
    //   name: string;
    //   role: string;
    // }

    // export default function HomePage() {
    //   const navigate = useNavigate();
    //   const [user, setUser] = useState<User | null>(null);

    //   useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //       const parsedUser = JSON.parse(storedUser);
    //       setUser(parsedUser);
    //     } else {
    //       navigate("/login");
    //     }
    //   }, [navigate]);

    //   if (!user) {
    //     return (
    //       <div className="min-h-screen flex items-center justify-center">
    //         <p>Chargement...</p>
    //       </div>
    //     );
    //   }

    //   const roleLabel =
    //     user.role === "admin" ? "Administrateur" :
    //     user.role === "associate" ? "Associé(e)" :
    //     user.role === "volunteer" ? "Bénévole" : user.role;

    //   return (
    //     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white px-6 py-10">
    //       <div className="max-w-4xl mx-auto text-center flex-grow">
    //         <h1 className="text-4xl font-bold text-gray-800 mb-2">
    //           Bienvenue, {user.name} 👋
    //         </h1>
    //         <p className="text-lg text-gray-500 mb-10">Rôle : {roleLabel}</p>

    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
    //           <div
    //             onClick={() => navigate("/dashboard")}
    //             className="cursor-pointer p-6 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 hover:-translate-y-1"
    //           >
    //             <LayoutDashboard className="w-8 h-8 text-blue-500 mb-3" />
    //             <h2 className="text-xl font-semibold">Tableau de bord</h2>
    //             <p className="text-sm text-gray-500 mt-1">
    //               Gérez votre profil, vos activités et vos paramètres.
    //             </p>
    //           </div>

    //           <div
    //             onClick={() => navigate("/events")}
    //             className="cursor-pointer p-6 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 hover:-translate-y-1"
    //           >
    //             <CalendarDays className="w-8 h-8 text-green-500 mb-3" />
    //             <h2 className="text-xl font-semibold">Voir les Événements</h2>
    //             <p className="text-sm text-gray-500 mt-1">
    //               Explorez, rejoignez ou gérez des événements à venir.
    //             </p>
    //           </div>
    //         </div>

    //         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl shadow-md flex items-start gap-4 max-w-2xl mx-auto mb-12">
    //           <Megaphone className="w-6 h-6 text-yellow-600 mt-1" />
    //           <div className="text-left">
    //             <h3 className="font-semibold text-yellow-700">Annonce</h3>
    //             <p className="text-sm text-yellow-800">
    //               La Caravane <strong>Aji Tkhdem</strong> est en cours ! Rejoignez-nous entre le 23 et le 28 juin dans votre ville pour découvrir des opportunités.
    //             </p>
    //           </div>
    //         </div>
    //       </div>

    //             {/* Pourquoi devenir bénévole section */}
    // <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-purple-50 to-white p-8 max-w-4xl mx-auto mb-16 mt-30 transition-all duration-500 hover:shadow-2xl">
    //   <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">Pourquoi devenir bénévole ?</h2>
    //   <p className="text-gray-700 text-lg leading-relaxed text-center max-w-2xl mx-auto">
    //     volunteerConnect est une plateforme digitale qui vise à rapprocher les associations locales des citoyens désireux de s'engager dans des actions solidaires.
    //     Elle facilite la mise en relation entre les bénévoles et les projets associatifs, renforçant ainsi l'impact social au niveau local tout en offrant aux volontaires une expérience enrichissante et humaine.
    //   </p>

    //   <div className="mt-6 flex justify-center gap-6 text-purple-600">
    //     <div className="flex flex-col items-center">
    //       <CalendarDays className="w-8 h-8 mb-2" />
    //       <span className="text-sm font-medium">Événements</span>
    //     </div>
    //     <div className="flex flex-col items-center">
    //       <LayoutDashboard className="w-8 h-8 mb-2" />
    //       <span className="text-sm font-medium">Engagement</span>
    //     </div>
    //     <div className="flex flex-col items-center">
    //       <Megaphone className="w-8 h-8 mb-2" />
    //       <span className="text-sm font-medium">Impact</span>
    //     </div>
    //   </div>
    // </div>


    //       {/* Footer */}
    //       <footer className="border-t border-gray-300 pt-6 text-gray-600 text-sm max-w-4xl mx-auto w-full">
    //         <div className="flex justify-center space-x-6 mb-4 text-gray-500">
    //           <a
    //             href=""
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             aria-label="Twitter"
    //             className="hover:text-blue-500 transition-colors"
    //           >
    //             <Twitter className="w-6 h-6" />
    //           </a>
    //           <a
    //             href=""
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             aria-label="Facebook"
    //             className="hover:text-blue-700 transition-colors"
    //           >
    //             <Facebook className="w-6 h-6" />
    //           </a>
    //           <a
    //             href=""
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             aria-label="Instagram"
    //             className="hover:text-pink-500 transition-colors"
    //           >
    //             <Instagram className="w-6 h-6" />
    //           </a>
    //         </div>

    //         <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 sm:gap-0">
    //           <div className="flex items-center gap-3">
    //             <Mail className="w-5 h-5 text-gray-400" />
    //             <a href="mailto:contact@example.com" className="hover:underline">
    //               mohamedboutadoute@gmail.com
    //             </a>
    //           </div>
    //           <div className="flex items-center gap-3">
    //             <Phone className="w-5 h-5 text-gray-400" />
    //             <a href="tel:+212720737386" className="hover:underline">
    //               +212 720-737386
    //             </a>
    //           </div>
    //           <div className="flex items-center gap-3">
    //             <MapPin className="w-5 h-5 text-gray-400" />
    //             <a
    //               href="https://maps.app.goo.gl/hNmj5cfJShodmKww6"
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="hover:underline"
    //             >
    //               85000 Arbaa sahel, Tiznit, Morocco
    //             </a>
    //           </div>
    //         </div>

    //         <p className="text-center mt-4 text-xs text-gray-400">
    //           &copy; {new Date().getFullYear()} volunteerConnect. All rights reserved.
    //         </p>
    //       </footer>

    //     </div>
    //   );
    // }








import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  UserCog,
  Megaphone,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

interface User {
  name: string;
  role: string;
  id?: string;
}




  const steps = [
    {
      icon: <CalendarDays className="w-10 h-10" />,
      title: "Se connecter au site",
      description:
        "Créez un compte ou connectez-vous pour accéder à toutes les fonctionnalités de la plateforme.",
    },
    {
      icon: <LayoutDashboard className="w-10 h-10" />,
      title: "Remplir le formulaire",
      description:
        "Complétez votre profil et les informations nécessaires pour postuler à une activité.",
    },
    {
      icon: <Megaphone className="w-10 h-10" />,
      title: "Valider son inscription",
      description:
        "Confirmez votre participation et recevez les instructions pour rejoindre l'activité.",
    },
  ];

// export default function HomePage() {
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//       useEffect(() => {
//   const stored = localStorage.getItem("user");
//   if (stored) {
//     try {
//       const parsed = JSON.parse(stored);
//       if (parsed?.role && parsed?.name) {
//         setUser(parsed);
//       }
//     } catch (e) {
//       console.error("Invalid user JSON", e);
//     }
//   }
//   setLoading(false); // ← important
// }, []);

// useEffect(() => {
//   if (!loading && !user) {
//     navigate("/login");
//   }
// }, [loading, user, navigate]);

// if (loading) {
//       return (
//         <div className="min-h-screen flex items-center justify-center">
//           <p>Chargement...</p>
//         </div>
//       );
//     }

//     const roleLabel =
//       user.role === "admin"
//         ? "Administrateur"
//         : user.role === "associate"
//         ? "Associé(e)"
//         : user.role === "volunteer"
//         ? "Bénévole"
//         : user.role;

export default function HomePage({ user }: HomePageProps) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const roleLabel =
    user.role === "admin"
      ? "Administrateur"
      : user.role === "associate"
      ? "Associé(e)"
      : user.role === "volunteer"
      ? "Bénévole"
      : user.role;


  return (
    <div className="min-h-screen flex flex-col px-1 py-1 relative bg-white text-black dark:bg-gray-900 dark:text-white">








  {/* Top Navigation Bar */}
  <div className="flex items-center justify-between px-0 py-0 mb-8  max-w-6xl mx-auto w-full">


        {/* Notification Icon */}
    <button className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600 hover:text-blue-500 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      {/* Notification badge (optional) */}
      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
    </button>



           <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-2 py-2 ml-15 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-5 h-5 text-yellow-400" />
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 text-gray-800" />
              </>
            )}
          </button>

  {/* Search with icon inside */}
  <div className="relative flex-1 px-50">
    <input
      type="text"
      placeholder="Rechercher..."
      className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    {/* Search icon button */}
    <button
      type="button"
      onClick={() => console.log("Search clicked")}
      className="absolute right-54 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5a7.5 7.5 0 010 14.15z"
        />
      </svg>
    </button>
  </div>



      {/* Logo */}
    <a href="" >
      <img
        src="Ch.png"
        alt="VolunteerConnect Logo"
        className="w-20 h-auto "
      />
    </a>
  </div>



       {/* Header */}
      <div className="max-w-6xl mx-auto text-center flex-grow">
        <h1 className="text-4xl font-bold mb-2">Bienvenue, {user.name} 👋</h1>
        <p className="text-lg text-gray-500 dark:text-gray-300 mb-10">
          Rôle : {roleLabel}
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition duration-300 hover:-translate-y-1"
          >
            <UserCog className="w-8 h-8 text-blue-500 mb-3" />
            <h2 className="text-xl font-semibold">Gestion du compte</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              Gérez votre profil et vos paramètres.
            </p>
          </div>

          <div
            onClick={() => navigate("/events")}
            className="cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition duration-300 hover:-translate-y-1"
          >
            <CalendarDays className="w-8 h-8 text-green-500 mb-3" />
            <h2 className="text-xl font-semibold">Voir les Événements</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              Explorez, rejoignez ou gérez des événements à venir.
            </p>
          </div>
        </div>
      </div>


         {/* À propos */}
      <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4 text-center">
          À propos de nous ?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg text-center">
           volunteerConnect est une plateforme digitale qui vise à rapprocher les associations locales des citoyens désireux de s'engager dans des actions solidaires.
        Elle facilite la mise en relation entre les bénévoles et les projets associatifs, renforçant ainsi l'impact social au niveau local tout en offrant aux volontaires une expérience enrichissante et humaine.
        </p>
      </div>

        

  {/* Étapes */}
      <section className="max-w-4xl mx-auto px-6 mb-16 mt-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Comment devenir bénévole ?
        </h2>

        <div className="flex flex-col md:flex-row justify-between gap-12">
          {[User, FileText, CheckCircle].map((Icon, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Icon className="w-9 h-9 text-purple-600" />
              <div className="border-l-2 border-dashed border-purple-600 h-8 my-2" />
              <h3 className="bg-purple-100 dark:bg-gray-700 px-4 py-2 rounded-xl">
                {["Se connecter", "Remplir le formulaire", "Valider l'inscription"][index]}
              </h3>
            </div>
          ))}
        </div>
      </section>







 {/* Footer */}
      <footer className="border-t border-gray-300 dark:border-gray-700 pt-6 text-sm max-w-4xl mx-auto w-full text-gray-600 dark:text-gray-300">
        <div className="flex justify-center space-x-6 mb-4">
          <Twitter className="w-6 h-6 hover:text-blue-500 cursor-pointer" />
          <Facebook className="w-6 h-6 hover:text-blue-700 cursor-pointer" />
          <Instagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 sm:gap-0">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <a href="mailto:mohamedboutadoute@gmail.com" className="hover:underline">
              mohamedboutadoute@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <a href="tel:+212720737386" className="hover:underline">
              +212 720-737386
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <a
              href="https://maps.app.goo.gl/hNmj5cfJShodmKww6"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              85000 Arbaa Sahel, Tiznit, Morocco
            </a>
          </div>
        </div>

        <p className="text-center mt-4 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} volunteerConnect. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}






















