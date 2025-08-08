import { useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import {Route, Routes} from 'react-router'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import AddDoctor from './pages/Admin/AddDoctors';
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from "./pages/Admin/Dashboard";
import DoctorList from './pages/Admin/DoctorList';


function App() {

  const {dToken} = useContext(DoctorContext);
  const {aToken} = useContext(AdminContext);
  
  return dToken || aToken ?  (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='/appointo/admin/appointments' element={<AllAppointments/>}></Route>
          <Route path='/appointo/admin/dashboard' element={<Dashboard/>}></Route>
          <Route path='/appointo/admin/profile' element={<DoctorProfile/>}></Route>
          <Route path='/appointo/admin/add-doctor' element={<AddDoctor/>}></Route>
          <Route path='/appointo/doctor/all-appointments' element={<AllAppointments/>}></Route>
          <Route path='/appointo/doctor/doctor-dashboard' element={<DoctorDashboard/>}></Route>
          <Route path='/appointo/doctor/doctor-appointments' element={<DoctorAppointment/>}></Route>
          <Route path='/appointo/doctor/doctor-profile' element={<DoctorProfile/>}></Route>
          <Route path='/appointo/admin/doctor-list' element={<DoctorList/>}></Route>
        </Routes>
      </div>
    </div>
    
  ) : 
  <>
  <ToastContainer/>
  <LoginPage/>
  </> 
}

export default App
