
import { Route, Routes } from 'react-router-dom';
import './App.css';


import Navbar from './component/Navbar';
import Addemployee from './component/Addemployee';
import EmployeeList from './component/EmployeeList';
import Login from './component/Login';
import EmployeeDashboard from './component/Dashboard/EmployeeDasboard';
import { AuthProvider } from './component/AuthProvider ';
import Homepage from './component/Homepage';
import Checkindashboard from './component/Dashboard/Checkindashboard';



import Admin from './component/admin/Admin';
import EmployeeManagement from './component/admin/EmployeeManagement';
import Attendance from './component/admin/Attendance';
import Dashboard from './component/admin/Dashboard';





function App() {


  return (
    <div className="App">
     <AuthProvider>
  <Navbar/>
 
  
  
  <Routes>
         <Route path='/admin' element={<Admin/>}/>
         <Route path='/employeemaagement' element={<EmployeeManagement/>}/>
         <Route path='/attendance' element={<Attendance/>}/>
         <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/Addemployee' element={<Addemployee/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/employeelist' element={<EmployeeList/>}/>
        <Route path='/employeedashboard' element={<EmployeeDashboard/>}/>
        <Route path='/checkindashboard' element={<Checkindashboard/>}/>

  
  
    

  </Routes>

  </AuthProvider>
    </div>
    
  );
}

export default App;
