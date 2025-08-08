import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { NavLink } from 'react-router'

export default function Sidebar() {
    const {dToken} = useContext(DoctorContext);
    const {aToken} = useContext(AdminContext);

    return (
        <div className=" min-h-screen bg-white border-r border-r-gray-300">
            { aToken && 
            <ul className="text-[#515151] mt-5">
                <NavLink to={'/appointo/admin/dashboard'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-7 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#284B63]' : ' ' }`}>
                    <img src={assets.home_icon} alt="" className="min-w-5"/>
                    <p className="hidden md:block">Dashboard</p>
                </NavLink>
                <NavLink to={'/appointo/admin/appointments'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-7 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#284B63]' : ' ' }`}>
                    <img src={assets.appointment_icon} alt="" className="min-w-5"/>
                    <p className="hidden md:block">Appointments</p>
                </NavLink>
                <NavLink to={'/appointo/admin/add-doctor'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-7 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#284B63]' : ' ' }`}>
                    <img src={assets.add_icon} alt="" className="min-w-5"/>
                    <p className="hidden md:block">Add Doctor</p>
                </NavLink>
                <NavLink to={'/appointo/admin/doctor-list'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-7 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#284B63]' : ' ' }`}>
                    <img src={assets.people_icon} alt="" className="min-w-5"/>
                    <p className="hidden md:block">Doctors List</p>
                </NavLink>
             </ul>
            }

            { dToken && 
            <ul className="text-[#515151] mt-5">
                <NavLink to={'/appointo/doctor/doctor-dashboard'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-7 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#284B63]' : ' ' }`}>
                    <img src={assets.home_icon} alt="" className="min-w-5"/>
                    <p className="hidden md:block">Dashboard</p>
                </NavLink>
                <NavLink to={'/appointo/doctor/doctor-appointments'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-7 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#284B63]' : ' ' }`}>
                    <img src={assets.appointment_icon} alt="" className="min-w-5"/>
                    <p className="hidden md:block">Appointments</p>
                </NavLink>
                <NavLink to={'/appointo/doctor/doctor-profile'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-7 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#284B63]' : ' ' }`}>
                    <img src={assets.people_icon} alt="" className="min-w-5"/>
                    <p className="hidden md:block">Profile</p>
                </NavLink>
             </ul>
            }

        </div>
    )
}