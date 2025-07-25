// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
//   Navigate,
// } from "react-router-dom";
// import { Sidebar } from "@/components/Sidebar";
// import LoginPage from "./pages/LoginPage";
// import { RegisterPage } from "./pages/RegisterPage";
// import HomePage from "./pages/HomePage";
// import { VolunteerEventPage } from "./pages/volunteer/Events";
// import { AssociateEventPage } from "./pages/admin/Events";
// import { FC, useState, useEffect, ReactNode } from "react";

// // ===============================
// // Custom Hook for Auth State
// // ===============================
// const useAuth = () => {
//   const [user, setUser] = useState<{ role: string; token: string } | null>(null);

//   useEffect(() => {
//     const saved = localStorage.getItem("user");
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         if (parsed?.role && parsed?.token) {
//           setUser(parsed);
//         }
//       } catch {
//         localStorage.removeItem("user");
//       }
//     }
//   }, []);

//   return { user, setUser };
// };

// // ===============================
// // Shared Layout Wrapper
// // ===============================
// const Layout: FC<{ children: ReactNode; role?: string }> = ({ children, role }) => {
//   const location = useLocation();
//   const isAuthPage = ["/login", "/register"].includes(location.pathname);

//   return isAuthPage ? (
//     <main className="min-h-screen flex items-center justify-center bg-gray-50">
//       {children}
//     </main>
//   ) : (
//     <div className="flex min-h-screen">
//       <Sidebar role={role || "volunteer"} />
//       <main className="flex-1 p-4">{children}</main>
//     </div>
//   );
// };

// // ===============================
// // Protected Route Component
// // ===============================
// const ProtectedRoute: FC<{ user: any; children: ReactNode }> = ({ user, children }) => {
//   return user ? <>{children}</> : <Navigate to="/login" replace />;
// };

// // ===============================
// // Role-Based Protected Route
// // ===============================
// const RoleProtectedRoute: FC<{
//   user: any;
//   allowedRoles: string[];
//   children: ReactNode;
// }> = ({ user, allowedRoles, children }) => {
//   if (!user) return <Navigate to="/login" replace />;
//   if (!allowedRoles.includes(user.role)) return <Navigate to="/home" replace />;
//   return <>{children}</>;
// };

// // ===============================
// // App Wrapper
// // ===============================
// const AppWrapper: FC = () => {
//   const { user, setUser } = useAuth();

//   return (
//     <Router>
//       <Layout role={user?.role}>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Navigate to={user ? "/home" : "/login"} replace />} />
//           <Route path="/login" element={<LoginPage setUser={setUser} />} />
//           <Route path="/register" element={<RegisterPage />} />

//           {/* Protected Routes */}
//           <Route
//             path="/home"
//             element={
//               <ProtectedRoute user={user}>
//                 <HomePage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/volunteer/events"
//             element={
//               <RoleProtectedRoute user={user} allowedRoles={["volunteer"]}>
//                 <VolunteerEventPage />
//               </RoleProtectedRoute>
//             }
//           />

//           <Route
//             path="/admin/events"
//             element={
//               <RoleProtectedRoute user={user} allowedRoles={["admin", "associate"]}>
//                 <AssociateEventPage />
//               </RoleProtectedRoute>
//             }
//           />

//           {/* Catch-all Redirect */}
//           <Route
//             path="*"
//             element={<Navigate to={user ? "/home" : "/login"} replace />}
//           />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };

// export default AppWrapper;


import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import LoginPage from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { VolunteerEventPage } from "./pages/volunteer/Events";
import { AssociateEventPage } from "./pages/admin/Events";
import { VolunteerEventDetails } from "./pages/volunteer/VolunteerEventDetails";
import { AssociateDashboard } from "./pages/admin/Dashboard";
import { VolunteerDashboard } from "./pages/volunteer/Dashboard";
import { VolunteerSettings } from "./pages/volunteer/SettingsVolunteer";
import { AssociateAdminSettings } from "./pages/admin/SettingsAdmin";
import { ProtectedRoute, RoleProtectedRoute } from "@/routes/ProtectedRoute";
import PublicHomePage from "./pages/PublicHomePage";
import { FC, useState, useEffect, ReactNode } from "react";

type UserRole = "admin" | "associate" | "volunteer";

export type UserType = {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  token: string;
};

// Custom hook for authentication state management
const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser && savedToken) {
        const parsedUser: UserType = JSON.parse(savedUser);
        if (parsedUser?.role && parsedUser?.id) {
          setUser({ ...parsedUser, token: savedToken });
        }
      }
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.error("Error loading user from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, setUser, loading };
};

// Layout component for consistent UI with sidebar
const Layout: FC<{
  children: ReactNode;
  user?: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}> = ({ children, user, setUser }) => {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  // Show centered layout for auth pages without sidebar
  if (isAuthPage) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        {children}
      </main>
    );
  }

  // Show loading screen while user data is not ready
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement de l'interface utilisateur...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar user={user} setUser={setUser} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

const AppWrapper: FC = () => {
  const { user, setUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement de l'application...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* ✅ Public routes without sidebar */}
        <Route path="/" element={<PublicHomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Protected routes with layout */}
        <Route
          path="/*"
          element={
            <Layout user={user} setUser={setUser}>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute user={user}>
                      <HomePage user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/events"
                  element={
                    <RoleProtectedRoute user={user} allowedRoles={["volunteer"]}>
                      <VolunteerEventPage />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/admin/events"
                  element={
                    <RoleProtectedRoute user={user} allowedRoles={["admin", "associate"]}>
                      <AssociateEventPage />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <RoleProtectedRoute user={user} allowedRoles={["admin", "associate"]}>
                      <AssociateDashboard />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/dashboard"
                  element={
                    <RoleProtectedRoute user={user} allowedRoles={["volunteer"]}>
                      <VolunteerDashboard />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/events/:id"
                  element={
                    <ProtectedRoute user={user}>
                      <VolunteerEventDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute user={user}>
                      {user?.role === "volunteer" ? (
                        <VolunteerSettings />
                      ) : (
                        <AssociateAdminSettings />
                      )}
                    </ProtectedRoute>
                  }
                />
                {/* fallback for 404 inside layout */}
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </Layout>
          }
        />

        {/* Fallback for unmatched public paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppWrapper;
