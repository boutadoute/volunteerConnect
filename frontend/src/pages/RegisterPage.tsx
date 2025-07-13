import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(""); 
  const [phone_number, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer"); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (fullName.trim().length < 3) {
      setError("Le nom doit contenir au moins 3 caractères.");
      setLoading(false);
      return;
    }
    if (!phone_number || !city || !email || !password) {
      setError("Tous les champs sont obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/volunteers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone_number,
          city,
          email,
          password,
          role,
        }),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login");
      } else {
        let errMsg = "Une erreur est survenue lors de l'inscription";
        try {
          const err = await response.json();
          console.error("Register error response:", err);

          if (err.errors) {
            errMsg = Object.entries(err.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("; ");
          } else if (err.message) {
            errMsg = err.message;
          }
        } catch {
          console.error("Failed to parse error response");
        }
        setError(errMsg);
      }
    } catch (error: any) {
      setError(error.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Créer un nouveau compte</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            placeholder="Nom complet"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            placeholder="Numéro de téléphone"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <Input
            placeholder="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                value="volunteer"
                checked={role === "volunteer"}
                onChange={() => setRole("volunteer")}
              />
              <span className="ml-2">volunteer</span>
            </label>
            <label>
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              <span className="ml-2">admin</span>
            </label>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button variant="link" onClick={() => navigate("/login")}>
            Vous avez déjà un compte? Connectez-vous
          </Button>
        </div>
      </div>
    </div>
  );
}
