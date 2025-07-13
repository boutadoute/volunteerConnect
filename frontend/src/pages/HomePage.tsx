

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
import "../PublicHomePage.css"

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
      {/* Notification  */}
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

                        {/* MOVING IMAGE BANNER */}
          <div className="mt-10">
                <h1 className="pl-116 mb-10 text-3xl font-bold">Bienvenue, {user.name}</h1>

                <div className="marquee-container">
            <div className="marquee-content">
              {/* First set of images */}
              <img src="bg.jpg" alt="1" />
              <img src="im2.jpg" alt="2" />
              <img src="im3.jpg" alt="3" />
              <img src="im4.jpg" alt="4" />

              {/* Duplicate set (must be identical for smooth loop) */}
              <img src="bg.jpg" alt="1-duplicate" />
              <img src="im2.jpg" alt="2-duplicate" />
              <img src="im3.jpg" alt="3-duplicate" />
              <img src="im4.jpg" alt="4-duplicate" />
            </div>
          </div>
              </div>



         {/* À propos */}
      <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mb-16 mt-35">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4 text-center">
          À propos de nous ?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg text-center">
           volunteerConnect est une plateforme digitale qui vise à rapprocher les associations locales des citoyens désireux de s'engager dans des actions solidaires.
        Elle facilite la mise en relation entre les bénévoles et les projets associatifs, renforçant ainsi l'impact social au niveau local tout en offrant aux volontaires une expérience enrichissante et humaine.
        </p>
      </div>


            {/* À PROPOS */}
      <section className="max-w-4xl mx-auto px-3 py-20 text-center">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4">Qui peut participer ?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Tout le monde peut participer à <strong>volunteerConnect</strong>  à condition d’avoir 18 ans minimum. <strong>volunteerConnect</strong>  s’adresse à toutes les personnes de bonne volonté, et tous ceux qui pensent pouvoir améliorer les choses en donnant de leur temps. Alors, faites tous partie des bénévoles <strong>volunteerConnect</strong> en participant aux projets des associations.
        </p>
      </section>

        

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
                {["Se connecter", "inscrire à l'event", "Valider l'inscription"][index]}
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






















