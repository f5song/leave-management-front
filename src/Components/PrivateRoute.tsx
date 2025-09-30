import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
