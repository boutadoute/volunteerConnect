import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

interface LoginPageProps {
  setUser: React.Dispatch<React.SetStateAction<{ role: string; token: string } | null>>;
}

const LoginPage = ({ setUser }: LoginPageProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/volunteers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      const { fullName, role, email: volunteerEmail, id } = data.volunteer;

      console.log("✅ Login successful:", { fullName, role, id });

      localStorage.setItem("user", JSON.stringify({ name: fullName, role, id, email: volunteerEmail }));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", id);

      setUser({ role, token: data.token });
      navigate("/home");
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-indigo-700">
            Connexion
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </CardContent>
      </div>
    </div>
  );
};

export default LoginPage;
