import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import Login from "./pages/Login.jsx";
import Appointment from "./pages/Appointment.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import MyAppointment from "./pages/MyAppointment.jsx";

function App() {
  return (
    <>
      <div className="mx-4 sm:mx-[5%]">
        <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/appointo/about" element={<About/>}></Route>
            <Route path="/appointo/contact" element={<Contact/>}></Route>
            <Route path="/appointo/doctors" element={<Doctors/>}></Route>
            <Route path="/appointo/doctors/:speciality" element={<Doctors/>}></Route>
            <Route path="/appointo/login" element={<Login/>}></Route>
            <Route path="/appointo/appointment/:docId" element={<Appointment/>}></Route>
            <Route path="/appointo/MyProfile" element={<MyProfile/>}></Route>
            <Route path="/appointo/my-appointments" element={<MyAppointment/>}></Route>
          </Routes>
          <Footer/>
      </div>
    </>
  );
}

export default App;
