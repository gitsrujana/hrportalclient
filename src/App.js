
import { Route, Routes } from 'react-router-dom';
import './App.css';


import Navbar from './component/Navbar';
import Addemployee from './component/Addemployee';
import EmployeeList from './component/EmployeeList';
import Login from './component/Login';
import EmployeeDashboard from './component/Dashboard/EmployeeDasboard';
import { AuthProvider } from './component/AuthProvider ';
import Homepage from './component/Homepage';
import AdminDashboard from './component/Dashboard/AdminDashboard';
import { useState } from 'react';


function App() {


  return (
    <div className="App">
     <AuthProvider>
  <Navbar/>

 

  <Routes>
    
         <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/Addemployee' element={<Addemployee/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/employeelist' element={<EmployeeList/>}/>
        <Route path='/employeedashboard' element={<EmployeeDashboard/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
  </Routes>

  </AuthProvider>
    </div>
    
  );
}

export default App;
