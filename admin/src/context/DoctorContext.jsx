import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [appointments, setAppointments] = useState([]);
  const [profileData, setProfileData] = useState(false);
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [dashData, setDashData] = useState(false);

  //Getting Doctor appointments data from Database
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/appointo/doctor/appointments",
        { headers: { dToken } }
      );
      console.log(data);

      if (data.success) {
        const appts = Array.isArray(data.appointments)
          ? data.appointments.reverse()
          : [data.appointments]; // convert object to array
        setAppointments(appts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting Doctor Profile data from Database
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/appointo/doctor/profile",
        { headers: { dToken } }
      );
      setProfileData(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //Function to cancel doctor appointment

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/appointo/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        // after creating dashboard
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to Mark appointment completed using API
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/appointo/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        // Later after creating getDashData Function
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Getting Doctor dashboard data using API
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/appointo/doctor/dashboard", {
        headers: { dToken },
      });


      if (data.success) {
        setDashData(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    dashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
