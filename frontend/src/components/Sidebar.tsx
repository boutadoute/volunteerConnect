import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Home,
  Settings,
  LogOut,
  LayoutDashboard,
  Calendar,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

interface SidebarProps {
  user?: {
    id: string;
    role: "admin" | "associate" | "volunteer";
    name: string;
    email: string;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export function Sidebar({ user, setUser }: SidebarProps) {
  const navigate = useNavigate();


  if (!user) {
    return null; 
  }

  const isAdmin = user.role === "admin" || user.role === "associate";
  const dashboardPath = isAdmin ? "/admin/dashboard" : "/volunteer/dashboard";
  const eventPath = isAdmin ? "/admin/events" : "/volunteer/events";

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <aside className="w-64 bg-muted p-4 flex flex-col border-r">
      <ScrollArea className="flex-1">
        <nav className="space-y-2">
          <Link to="/home">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>

          <Link to={eventPath}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </Button>
          </Link>

          <Link to={dashboardPath}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </ScrollArea>

      <Separator className="my-2" />

      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </aside>
  );
}
