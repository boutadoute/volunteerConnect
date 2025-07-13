// import { Link } from "react-router-dom";
// import {
//   Twitter,
//   Facebook,
//   Instagram,
//   Mail,
//   Phone,
//   MapPin,
//   User,
//   FileText,
//   CheckCircle,
// } from "lucide-react";

// export default function PublicHomePage() {
//   return (
//     <div className="min-h-screen flex flex-col px-4 py-6 bg-white text-black dark:bg-gray-900 dark:text-white">
//       {/* --- Top Bar --- */}
//       <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto w-full">
//         {/* Logo */}
//         <img src="/Ch.png" alt="Logo" className="w-20 h-auto" />

//         {/* Auth buttons */}
//         <div className="space-x-4">
//           <Link
//             to="/login"
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             Se connecter
//           </Link>
//           <Link
//             to="/register"
//             className="px-4 py-2 bg-gray-200 text-black dark:text-white dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
//           >
//             S'inscrire
//           </Link>
//         </div>
//       </div>

//       {/* --- Hero Section --- */}
//       <div className="text-center mb-16">
//         <h1 className="text-4xl font-bold mb-4">Bienvenue sur volunteerConnect</h1>
//         <p className="text-lg text-gray-600 dark:text-gray-300">
//           Rejoignez notre communauté de bénévoles et changez le monde autour de vous.
//         </p>
//       </div>

//       {/* --- À propos --- */}
//       <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-4xl mx-auto mb-16">
//         <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4 text-center">
//           À propos de nous
//         </h2>
//         <p className="text-gray-700 dark:text-gray-300 text-lg text-center">
//           volunteerConnect est une plateforme digitale qui vise à rapprocher les associations locales des citoyens désireux de s'engager dans des actions solidaires.
//           Elle facilite la mise en relation entre les bénévoles et les projets associatifs, renforçant ainsi l'impact social au niveau local tout en offrant aux volontaires une expérience enrichissante et humaine.
//         </p>
//       </div>

//       {/* --- Comment devenir bénévole --- */}
//       <section className="max-w-4xl mx-auto px-6 mb-16 mt-10">
//         <h2 className="text-3xl font-bold mb-12 text-center">
//           Comment devenir bénévole ?
//         </h2>
//         <div className="flex flex-col md:flex-row justify-between gap-12">
//           {[User, FileText, CheckCircle].map((Icon, index) => (
//             <div key={index} className="flex flex-col items-center text-center">
//               <Icon className="w-9 h-9 text-purple-600" />
//               <div className="border-l-2 border-dashed border-purple-600 h-8 my-2" />
//               <h3 className="bg-purple-100 dark:bg-gray-700 px-4 py-2 rounded-xl">
//                 {["Se connecter", "s'inscrire a l'event", "Valider l'inscription"][index]}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </section>


//       {/* --- Footer --- */}
//       <footer className="border-t border-gray-300 dark:border-gray-700 pt-6 text-sm max-w-4xl mx-auto w-full text-gray-600 dark:text-gray-300">
//         <div className="flex justify-center space-x-6 mb-4">
//           <Twitter  className="w-6 h-6 hover:text-blue-500 cursor-pointer" />
//           <a href="https://www.facebook.com/simo.boutadoute"><Facebook  className="w-6 h-6 hover:text-blue-700 cursor-pointer" /></a>
//           <Instagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" />
//         </div>

//         <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 sm:gap-0">
//           <div className="flex items-center gap-3">
//             <Mail className="w-5 h-5 text-gray-400" />
//             <a href="mailto:mohamedboutadoute@gmail.com" className="hover:underline">
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
//               85000 Arbaa Sahel, Tiznit, Morocco
//             </a>
//           </div>
//         </div>

//         <p className="text-center mt-4 text-xs text-gray-400">
//           &copy; {new Date().getFullYear()} volunteerConnect. Tous droits réservés.
//         </p>
//       </footer>
//     </div>
//   );
// }



import { useNavigate } from "react-router-dom";
import { User, FileText, CheckCircle, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import "../PublicHomePage.css"

export default function PublicHomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white flex flex-col">
      {/* HEADER */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center py-6 px-4">
        <img src="/Ch.png" alt="VolunteerConnect Logo" className="h-25" />
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Se connecter
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            S'inscrire
          </button>
        </div>
      </header>

      {/* MOVING IMAGE BANNER */}
    <div>
        <h1 className="pl-135 mb-10 text-3xl font-bold">Bienvenue à VolunteerConnect</h1>

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

      {/* À PROPOS */}
      <section className="max-w-4xl mx-auto px-3 py-20 text-center">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4">À propos de nous</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          <strong>volunteerConnect</strong>  est une plateforme digitale qui vise à rapprocher les associations locales des citoyens désireux de s'engager dans des actions solidaires.
        Elle facilite la mise en relation entre les bénévoles et les projets associatifs, renforçant ainsi l'impact social au niveau local tout en offrant aux volontaires une expérience enrichissante et humaine.
        </p>
      </section>


      {/* À PROPOS */}
      <section className="max-w-4xl mx-auto px-3 py-20 text-center">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4">Qui peut participer ?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Tout le monde peut participer à <strong>volunteerConnect</strong>  à condition d’avoir 18 ans minimum. <strong>volunteerConnect</strong>  s’adresse à toutes les personnes de bonne volonté, et tous ceux qui pensent pouvoir améliorer les choses en donnant de leur temps. Alors, faites tous partie des bénévoles <strong>volunteerConnect</strong> en participant aux projets des associations.
        </p>
      </section>

      {/* COMMENT DEVENIR BÉNÉVOLE */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Comment devenir bénévole ?</h2>
        <div className="flex flex-col md:flex-row justify-around items-center gap-12">
          {[User, FileText, CheckCircle].map((Icon, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Icon className="w-10 h-10 text-purple-600 mb-2" />
              <div className="border-l-2 border-dashed border-purple-600 h-6 mb-2" />
              <h3 className="bg-purple-100 dark:bg-gray-700 px-4 py-2 rounded-xl font-semibold">
                {["Se connecter", "inscrire à l'event", "Valider l'inscription"][index]}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
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
