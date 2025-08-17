import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  role?: "admin" | "user";
}

const ProtectedRoute = ({ children, role }: Props) => {
  const token = localStorage.getItem("token");
  if (!token)
    return <Navigate to={role === "admin" ? "/admins/login" : "/login"} />;

  const decoded = JSON.parse(atob(token.split(".")[1]));
  console.log("🔐 Decoded Token:", decoded);

  const userRole = decoded?.role;
  if (role && userRole !== role) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
