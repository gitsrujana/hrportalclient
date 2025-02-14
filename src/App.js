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

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/employeemanagement" element={<EmployeeManagement />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/dashboard" element={<Dashboard />} />

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
