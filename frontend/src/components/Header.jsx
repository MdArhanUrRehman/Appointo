import arrow_icon from "../assets/arrow_icon.svg"
import Home_Page from "../assets/homePage.png"
import group_profiles from "../assets/group_profiles.png"

export default function () {
  
    return(
        <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-b from-[#3C6E8F] to-[#A3CFE0] rounded-lg px-6 md:px-10 lg:px-20">
           <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb[-30px]">
             <p className="text-3xl md:text-5xl lg:text:6xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
                Book Appointment <br />
                With Trusted Doctors
             </p>

             <div className="flex flex-col md:flex-row items-start justify-center gap-4 py-5 m-auto md:mb-[-30px] text-white">
                <img src={group_profiles} className="w-28" alt="" />
                <p>Simply browse through our extensive list of trusted doctors,  schedule your appointment hassle-free.</p>
             </div>
             <a href="#speciality" className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm mt-0 md:mt-5 hover:scale-105 transition-all duration-300">
                Book Appointment <img className="w-3" src={arrow_icon} alt="" />
             </a>
           </div>

           <div className="md:w-1/2 relative">
            <img src={Home_Page} className="w-full md:absolute bottom-0 h-auto rounded-lg" alt="" />
           </div>
        </div>
    )
  
}
