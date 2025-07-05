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
  role: "admin" | "associate" | "volunteer";
  userId: string;
}

export function Sidebar({ role, userId }: SidebarProps) {
  const isAdmin = role === "admin" || role === "associate";
  const dashboardPath = isAdmin ? "/admin/dashboard" : "/volunteer/dashboard";
  const eventPath = isAdmin ? "/admin/events" : "/volunteer/events";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
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

          <Link to={eventPath} state={{ role, userId }}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </Button>
          </Link>

          <Link to={dashboardPath} state={{ role, userId }}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          <Link to="/settings" state={{ role, userId }}>
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

      {/* Optional: Show role */}
      <div className="mt-2 text-xs text-center text-muted-foreground">
        Connecté en tant que <strong>{role}</strong>
      </div>
    </aside>
  );
}
