// import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Card, CardContent } from "@/components/ui/card";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// type VolunteerData = {
//   fullName: string;
//   email: string;
//   phone: string;
//   preferences: {
//     emailNotifications: boolean;
//     smsAlerts: boolean;
//     darkMode: boolean;
//   };
//   availability: {
//     days: string;
//     hours: string;
//   };
// };

// export function VolunteerSettings() {
//   const [data, setData] = useState<VolunteerData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   if (!token || !userId) {
//     setError("Utilisateur non connecté.");
//     setLoading(false);
//     return;
//   }

//   const fetchData = async () => {
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/volunteers/profile/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error("Erreur lors du chargement des données");

//       const json = await res.json();

//       setData({
//         fullName: json.fullName || "",
//         email: json.email || "",
//         phone: json.phone || "",
//         preferences: {
//           emailNotifications: json.preferences?.emailNotifications ?? false,
//           smsAlerts: json.preferences?.smsAlerts ?? false,
//           darkMode: json.preferences?.darkMode ?? false,
//         },
//         availability: {
//           days: json.availability?.days || "",
//           hours: json.availability?.hours || "",
//         },
//       });
//     } catch (err) {
//       console.error("Erreur de chargement:", err);
//       setError("Impossible de charger les données du bénévole.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);

//   const handleSave = async () => {
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("token");

//     if (!token || !userId || !data) return;

//     try {
//       const res = await fetch(`${BACKEND_URL}/api/volunteers/vol/update/${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) throw new Error("Échec de mise à jour");
//       alert("Modifications enregistrées !");
//     } catch (err) {
//       alert("Erreur lors de la mise à jour");
//       console.error(err);
//     }
//   };

//   if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
//   if (error || !data) return <p className="text-center text-red-500">{error || "Erreur inconnue."}</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-10 font-sans">
//       <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
//         Paramètres du bénévole
//       </h1>

//       {/* Profile Info */}
//       <Card className="shadow-xl">
//         <CardContent className="p-6 space-y-6">
//           <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
//             Informations du profil
//           </h2>
//           <div className="grid md:grid-cols-2 gap-4">
//             <Input
//               placeholder="Nom complet"
//               value={data.fullName}
//               onChange={(e) => setData({ ...data, fullName: e.target.value })}
//             />
//             <Input
//               placeholder="Adresse email"
//               value={data.email}
//               onChange={(e) => setData({ ...data, email: e.target.value })}
//             />
//             <Input
//               placeholder="Téléphone"
//               value={data.phone}
//               onChange={(e) => setData({ ...data, phone: e.target.value })}
//             />
//             <Input type="password" placeholder="Nouveau mot de passe (optionnel)" />
//           </div>

//           <Button onClick={handleSave} className="bg-purple-600 text-white hover:bg-purple-700 mt-4">
//             Sauvegarder
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Preferences */}
//       <Card className="shadow-xl">
//         <CardContent className="p-6 space-y-6">
//           <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Préférences</h2>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span>Recevoir les notifications par email</span>
//               <Switch
//                 checked={data.preferences.emailNotifications}
//                 onCheckedChange={(value) =>
//                   setData({ ...data, preferences: { ...data.preferences, emailNotifications: value } })
//                 }
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Recevoir les alertes SMS</span>
//               <Switch
//                 checked={data.preferences.smsAlerts}
//                 onCheckedChange={(value) =>
//                   setData({ ...data, preferences: { ...data.preferences, smsAlerts: value } })
//                 }
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Mode sombre</span>
//               <Switch
//                 checked={data.preferences.darkMode}
//                 onCheckedChange={(value) =>
//                   setData({ ...data, preferences: { ...data.preferences, darkMode: value } })
//                 }
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Availability */}
//       <Card className="shadow-xl">
//         <CardContent className="p-6 space-y-6">
//           <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
//             Disponibilité
//           </h2>
//           <p className="text-sm text-gray-600">
//             Indiquez vos jours et heures de disponibilité.
//           </p>
//           <div className="grid md:grid-cols-2 gap-4">
//             <Input
//               placeholder="Ex : Lundi - Vendredi"
//               value={data.availability.days}
//               onChange={(e) =>
//                 setData({ ...data, availability: { ...data.availability, days: e.target.value } })
//               }
//             />
//             <Input
//               placeholder="Ex : 9h00 - 17h00"
//               value={data.availability.hours}
//               onChange={(e) =>
//                 setData({ ...data, availability: { ...data.availability, hours: e.target.value } })
//               }
//             />
//           </div>

//           <Button onClick={handleSave} className="bg-purple-600 text-white hover:bg-purple-700 mt-4">
//             Mettre à jour la disponibilité
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }











// VolunteerSettings.tsx
import React, { useEffect, useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";



type Preferences = {
  emailNotifications: boolean;
  smsAlerts: boolean;
  darkMode: boolean;
};

type Availability = {
  days: string;
  hours: string;
};

type VolunteerData = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  profileImage?: string;
  preferences: Preferences;
  availability: Availability;
};

export function VolunteerSettings() {
  const { theme, toggleTheme } = useTheme();
  const [data, setData] = useState<VolunteerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!token || !userId) {
        setError("Utilisateur non connecté.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/api/volunteers/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Erreur lors du chargement des données");

        const json = await res.json();

        setData({
          fullName: json.fullName || "",
          email: json.email || "",
          phone: json.phone || "",
          password: "",
          profileImage: json.profileImage || "",
          preferences: {
            emailNotifications: json.preferences?.emailNotifications ?? false,
            smsAlerts: json.preferences?.smsAlerts ?? false,
            darkMode: json.preferences?.darkMode ?? false,
          },
          availability: {
            days: json.availability?.days || "",
            hours: json.availability?.hours || "",
          },
        });
      } catch (err) {
        setError("Impossible de charger les données du bénévole.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prev) => (prev ? { ...prev, profileImage: reader.result as string } : prev));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const payload = { ...data };
      if (!payload.password) delete payload.password;

      const res = await fetch(`${BACKEND_URL}/api/volunteers/vol/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Échec de mise à jour");
      alert("Modifications enregistrées !");
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center">Chargement...</p>;
  if (error || !data) return <p className="text-center text-red-500">{error || "Erreur inconnue."}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-purple-700 text-center">Paramètres du bénévole</h1>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500">
              {data.profileImage ? (
                <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">👤</div>
              )}
            </div>
            <label htmlFor="profileImageUpload" className="mt-3 text-sm text-purple-600 cursor-pointer">
              Changer l'image de profil
            </label>
            <input id="profileImageUpload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>

          <Input
            placeholder="Nom complet"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            placeholder="Téléphone"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Nouveau mot de passe (optionnel)"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Email Notifications</span>
              <Switch
                checked={data.preferences.emailNotifications}
                onCheckedChange={(value) =>
                  setData({ ...data, preferences: { ...data.preferences, emailNotifications: value } })
                }
              />
            </div>
            <div className="flex justify-between">
              <span>Alertes SMS</span>
              <Switch
                checked={data.preferences.smsAlerts}
                onCheckedChange={(value) =>
                  setData({ ...data, preferences: { ...data.preferences, smsAlerts: value } })
                }
              />
            </div>
            <div className="flex justify-between">
              <span>Mode sombre</span>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(value) => {
                    toggleTheme();
                    setData({
                    ...data,
                    preferences: { ...data.preferences, darkMode: value },
                    });
                }}
                />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Ex : Lundi - Vendredi"
              value={data.availability.days}
              onChange={(e) =>
                setData({ ...data, availability: { ...data.availability, days: e.target.value } })
              }
            />
            <Input
              placeholder="Ex : 9h00 - 17h00"
              value={data.availability.hours}
              onChange={(e) =>
                setData({ ...data, availability: { ...data.availability, hours: e.target.value } })
              }
            />
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? "Enregistrement..." : "Sauvegarder"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


