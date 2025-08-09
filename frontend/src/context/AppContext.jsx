import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = "https://appointo-backend-fn6i.onrender.com";

  const [doctor, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [userData, setUserData] = useState(false);


  //Getting Docotrs using API
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/appointo/doctor/list");
      // console.log(data)

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting User Profile using API
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/appointo/user/get-profile", {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    getDoctorsData();
    loadUserProfileData()
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
  }, [token]);

  const value = {
    doctor, getDoctorsData,
    currencySymbol,
    backendUrl, 
    token, setToken, 
    userData, setUserData,
    loadUserProfileData, setDoctors
  };

  return (
    <AppContext.Provider value={value}>
      {props.children} {/* important: render children */}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
