import { Navigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
