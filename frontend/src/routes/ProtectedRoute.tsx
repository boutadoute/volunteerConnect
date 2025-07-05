import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: any;
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ user, children }) => {
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

interface RoleProtectedRouteProps {
  user: any;
  allowedRoles: string[];
  children: ReactNode;
}

export const RoleProtectedRoute: FC<RoleProtectedRouteProps> = ({
  user,
  allowedRoles,
  children,
}) => {
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/home" replace />;
  return <>{children}</>;
};
