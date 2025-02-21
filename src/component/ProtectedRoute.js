// import { Navigate } from "react-router-dom";
// import { useAdminAuth } from "../component/admin/AdminAuthProvider ";
// import Dashboard from "./admin/Dashboard";



// const ProtectedRoute = ({ children }) => {
//   const { admin } = useAdminAuth();

//   const isAuthenticated = localStorage.getItem("adminToken");

//   return isAuthenticated ? <Dashboard /> : <Navigate to="/admin-login" />;
// }  

// export default ProtectedRoute;



import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../component/admin/AdminAuthProvider ";

const ProtectedRoute = ({ children }) => {
  const { admin } = useAdminAuth();
  const isAuthenticated = localStorage.getItem("adminToken");

  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
