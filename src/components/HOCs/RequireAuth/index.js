import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

function RequireAuth({ children }) {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
