import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./component/Navbar";
import Addemployee from "./component/Addemployee";

import Login from "./component/Login";
import EmployeeDashboard from "./component/Dashboard/EmployeeDasboard";
import { AuthProvider } from "./component/AuthProvider ";
import Homepage from "./component/Homepage";
import Checkindashboard from "./component/Dashboard/Checkindashboard";

import Admin from "./component/admin/Admin";
import EmployeeManagement from "./component/admin/EmployeeManagement";
import Attendance from "./component/admin/Attendance";
import Dashboard from "./component/admin/Dashboard";
import { AdminAuthProvider } from "./component/admin/AdminAuthProvider ";
import AdminLogin from "./component/admin/AdminLogin";
import ProtectedRoute from "./component/ProtectedRoute";
import Category from "./component/admin/Category";
import Leaves from "./component/admin/Leaves";
import Salary from "./component/admin/Salary";
import Profile from "./component/admin/Profile";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        
        <Navbar />
        <AdminAuthProvider>
          <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
         

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/employeemanagement"
            element={
              <ProtectedRoute>
                <EmployeeManagement />
              </ProtectedRoute>
            }
          />
           <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route path="category" element={
             <ProtectedRoute>
            <Category/>
            </ProtectedRoute>
            }/>
          <Route path="leaves" element={
             <ProtectedRoute>
            <Leaves/>
            </ProtectedRoute>
            }/>
          <Route path="salary" element={
             <ProtectedRoute>
            <Salary/>
            </ProtectedRoute>
            }/>
          <Route path="profile" element={
             <ProtectedRoute>
            <Profile/>
            </ProtectedRoute>
            }/>
        </Routes>


        </AdminAuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/admin" element={<Admin />} />
          <Route path="/employeemanagement" element={<EmployeeManagement />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}

          <Route path="/Addemployee" element={<Addemployee />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/employeedashboard" element={<EmployeeDashboard />} />
          <Route path="/checkindashboard" element={<Checkindashboard />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;