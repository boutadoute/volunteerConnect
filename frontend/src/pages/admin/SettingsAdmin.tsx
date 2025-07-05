import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent,      } from "@/components/ui/card";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

type UserRole = "associate" | "admin";

type AdminSettingsData = {
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  password?: string;
  preferences: {
    emailNotifications: boolean;
    smsAlerts: boolean;
  };
};

export function AssociateAdminSettings() {
  const [data, setData] = useState<AdminSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError("Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/users/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors du chargement des données");

        const json = await res.json();
        setData({
          fullName: json.fullName || "",
          email: json.email || "",
          phone: json.phone || "",
          role: json.role || "associate",
          isActive: json.isActive ?? true,
          preferences: {
            emailNotifications: json.preferences?.emailNotifications ?? false,
            smsAlerts: json.preferences?.smsAlerts ?? false,
          },
        });
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError("Utilisateur non connecté.");
      setSaving(false);
      return;
    }

    try {
      const payload: any = { ...data };
      if (!payload.password) delete payload.password;

      const res = await fetch(`${BACKEND_URL}/api/users/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur de mise à jour");
      alert("Modifications enregistrées !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto p-8 grid gap-10 grid-cols-1 md:grid-cols-2">
      {/* Left Column */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-700">Profil Utilisateur</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Nom complet</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={data.email}
              type="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={data.phone}
              type="tel"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="role">Rôle</Label>
            <Select
              value={data.role}
              onValueChange={(value: UserRole) => setData({ ...data, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="associate">Associé</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              checked={data.isActive}
              onCheckedChange={(checked) => setData({ ...data, isActive: checked })}
            />
            <Label>Compte actif</Label>
          </div>

          <div>
            <Label htmlFor="password">Mot de passe (facultatif)</Label>
            <Input
              id="password"
              type="password"
              placeholder="Laissez vide pour ne pas changer"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-700">Préférences</h2>

        <Card className="shadow-md">
          <CardContent className="space-y-4 py-6">
            <div className="flex justify-between items-center">
              <span>Notifications Email</span>
              <Switch
                checked={data.preferences.emailNotifications}
                onCheckedChange={(checked) =>
                  setData({
                    ...data,
                    preferences: { ...data.preferences, emailNotifications: checked },
                  })
                }
              />
            </div>

            <div className="flex justify-between items-center">
              <span>Alertes SMS</span>
              <Switch
                checked={data.preferences.smsAlerts}
                onCheckedChange={(checked) =>
                  setData({
                    ...data,
                    preferences: { ...data.preferences, smsAlerts: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {saving ? "Enregistrement..." : "Sauvegarder les modifications"}
        </Button>
      </div>
    </div>
  );
}



