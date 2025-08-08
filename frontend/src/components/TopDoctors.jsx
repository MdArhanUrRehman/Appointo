import { useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export default function TopDoctors() {
  const { doctor } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
  <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
  <p className="sm:w-1/3 text-center text-sm">
    Simply browse through our extensive list of trusted doctors
  </p>
  <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
    {doctor?.slice(0, 10).map((item, index) => (
      <div
        onClick={() => {
          navigate(`/appointo/appointment/${item._id}`);
          scrollTo(0, 0);
        }}
        className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-transform duration-500"
        key={index}
      >
        <img
          src={item.image}
          alt={item.name}
          className="bg-[#EAEFFF] w-full h-58 object-cover"
        />
        <div className="p-5">
          <div
            className={`flex items-center gap-2 text-sm text-center ${
              item.available ? "text-green-500" : "text-gray-500"
            }`}
          >
            <p
              className={`w-2 h-2 rounded-full ${
                item.available ? "bg-green-500" : "bg-gray-500"
              }`}
            ></p>
            <p>{item.available ? "Available" : "Not Available"}</p>
          </div>
          <p className="text-[#262626] text-lg font-medium mt-2">{item.name}</p>
          <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
        </div>
      </div>
    ))}
  </div>
  <button
    onClick={() => {
      navigate("/appointo/doctors");
      scrollTo(0, 0);
    }}
    className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer transition hover:bg-[#cdd6e0]"
  >
    More
  </button>
</div>

  );
}
