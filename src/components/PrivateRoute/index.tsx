import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const user = localStorage.getItem("user");
  const location = useLocation();

  // Add loading spinner later

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
