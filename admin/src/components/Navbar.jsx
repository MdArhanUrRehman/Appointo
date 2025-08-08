import { useState } from "react";
import logo from "../assets/logo.png";
import dropdown from "../assets/dropdown_icon.svg";
import menu_icon from "../assets/menu_icon.svg";
import cross_icon from "../assets/cross_icon.png";
import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../../admin/src/context/AppContext";
import upload_area from "../assets/upload_area.png";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

export default function () {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false); 
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const logout = () => {
    navigate('/login');
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  };

  return (
    <div className="flex h-20 items-center justify-between text-sm py-4  border-b border-b-gray-300">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt=""
        className="w-44 cursor-pointer"
      />
      

      <div className="flex items-center gap-4 mr-8">
        
          <button
            onClick={() => logout()}
            className="bg-[#284B63] text-white px-8 py-3 rounded-full font-light mb-3 cursor-pointer md:block hidden"
          >
            Logout
          </button>
          {aToken && !dToken ? 
          <button
            onClick={() =>(logout(), navigate("/login"))}
            className="bg-[#284B63] text-white px-8 py-3 rounded-full font-light mb-3 cursor-pointer md:block hidden"
          >
            Doctor
          </button> : ""
        }
        

        <img
          onClick={() => setShowMenu(true)}
          src={menu_icon}
          className="w-6 md:hidden cursor-pointer"
          alt=""
        />

        <div
          className={`md:hidden fixed top-0 right-0 h-full w-full z-20 bg-white transform transition-transform duration-300 ${
            showMenu ? "-translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-20 items-center justify-between px-5 border-b border-b-[#ADADAD] mx-[5%]">
            <img src={logo} className="w-44 cursor-pointer" alt="" />
            <img
              onClick={() => setShowMenu(false)}
              src={cross_icon}
              className="w-7 cursor-pointer"
              alt=""
            />
          </div>

          <ul className="flex flex-col items-center gap-2 mt-5 text-lg font-medium">
            {aToken && !dToken ? 
              <p onClick={() => {logout(), navigate('/login')}} className="px-4 py-2 rounded-full inline-block transition duration-300 cursor-pointer ease-in-out hover:-translate-x-1 hover:scale-105 ...">Doctor</p>
              : " "
            }
            <p onClick={() => logout()} className="px-4 py-2 cursor-pointer rounded-full inline-block transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ...">Logout</p>
          </ul>
        </div>
      </div>
    </div>
  );
}
