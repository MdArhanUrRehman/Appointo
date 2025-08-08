import { useState } from "react";
import logo from "../assets/logo.png";
import dropdown from "../assets/dropdown_icon.svg";
import menu_icon from "../assets/menu_icon.svg";
import cross_icon from "../assets/cross_icon.png";
import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"
import upload_area from "../assets/upload_area.png";

export default function () {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };


  return (
    <div className="flex h-20 items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt=""
        className="w-44 cursor-pointer"
      />
      <ul className="md:flex items-start gap-5 font-medium hidden">
        <NavLink to="/">
          {({ isActive }) => (
            <>
              <li className="py-1">HOME</li>
              {isActive && (
                <hr className="border-none outline-none h-0.5 bg-[#284B63] w-4/5 m-auto" />
              )}
            </>
          )}
        </NavLink>
        <NavLink to="/appointo/doctors">
          {({ isActive }) => (
            <>
              <li className="py-1">ALL DOCTORS</li>
              {isActive && (
                <hr className="border-none outline-none h-0.5 bg-[#284B63] w-4/5 m-auto" />
              )}
            </>
          )}
        </NavLink>
        <NavLink to="/appointo/about">
          {({ isActive }) => (
            <>
              <li className="py-1">ABOUT</li>
              {isActive && (
                <hr className="border-none outline-none h-0.5 bg-[#284B63] w-4/5 m-auto" />
              )}
            </>
          )}
        </NavLink>
        <NavLink to="/appointo/contact">
          {({ isActive }) => (
            <>
              <li className="py-1">CONTACT</li>
              {isActive && (
                <hr className="border-none outline-none h-0.5 bg-[#284B63] w-4/5 m-auto" />
              )}
            </>
          )}
        </NavLink>
      </ul>

      <div className="flex items-center gap-4 mr-8">
        {token && userData ? (
          <div className="hidden md:flex items-center gap-2 cursor-pointer group relative">
            <img src={userData.image ? userData.image : upload_area} alt="image" className="w-8 h-8 rounded-full object-cover" />
            <img src={dropdown} alt="" className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-[#284B63] rounded z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/appointo/MyProfile")}
                  className="transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ..."
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/appointo/my-appointments")}
                  className="transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ..."
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ..."
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/appointo/login")}
            className="bg-[#284B63] text-white px-8 py-3 rounded-full font-light mb-3 cursor-pointer md:block hidden"
          >
            Create Account
          </button>
        )}

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
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded-full inline-block transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ...">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/appointo/doctors">
              <p className="px-4 py-2 rounded-full inline-block transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ...">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/appointo/about">
              <p className="px-4 py-2 rounded-full inline-block transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ...">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/appointo/contact">
              <p className="px-4 py-2 rounded-full inline-block transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ...">CONTACT</p>
            </NavLink>
            {!token ? 
            <NavLink onClick={() => setShowMenu(false)} to="/appointo/login">
              <p className="px-4 py-2 text-[#284B63] text-2xl font-medium rounded-full inline-block transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ...">Create Account</p>
            </NavLink> : null
            }
            {token && userData ? <><NavLink onClick={() => setShowMenu(false)} to="/appointo/my-appointments">
              <p className="px-4 py-2 rounded-full inline-block transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ...">My Appointments</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/appointo/MyProfile">
              <p className="px-4 py-2 rounded-full inline-block transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ...">My Profile</p>
            </NavLink></> : null}
            {/* <NavLink onClick={() => setShowMenu(false)} to='/login'>
              <p className="px-4 py-2 rounded-full text-lg font-medium text-[#284B63] inline-block transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ...">Admin</p>
            </NavLink> */}
            {token &&  <NavLink onClick={() => {logout(), setShowMenu(false)}} to="/appointo/contact">
              <p className="px-4 py-2 text-red-600 rounded-full inline-block transition duration-300 ease-in-out hover:-translate-x-1 hover:scale-105 ...">Logout</p>
            </NavLink>}

            
          </ul>
        </div>
      </div>
    </div>
  );
}
