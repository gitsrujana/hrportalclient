

import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../component/admin/AdminAuthProvider ";

const ProtectedRoute = ({ children }) => {
  const { admin } = useAdminAuth();
  const isAuthenticated = localStorage.getItem("adminToken");

  return isAuthenticated ? children : <Navigate to="/Admin" />;
};

export default ProtectedRoute;
