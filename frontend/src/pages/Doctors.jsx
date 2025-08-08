import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../context/AppContext";

export default function Doctors() {
  const { speciality } = useParams();

  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const { doctor } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctor.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctor)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctor, speciality])

  return (
    <div className="pb-20 pt-5">
      <p className="text-gray-600">Browse through the doctors specialist</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 cursor-pointer px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-[#284B63]" : ""
          }`}
        >
          Filters
        </button>
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/appointo/doctors")
                : navigate("/appointo/doctors/General physician")
            }
            className={`w-[94vw] sm:w-[auto] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-[#E2E5FF] text-black"
                : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/appointo/doctors")
                : navigate("/appointo/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gynecologist" ? "bg-[#E2E5FF] text-black " : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/appointo/doctors")
                : navigate("/appointo/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-[#E2E5FF] text-black " : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/appointo/doctors")
                : navigate("/appointo/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-[#E2E5FF] text-black " : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/appointo/doctors")
                : navigate("/appointo/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-[#E2E5FF] text-black " : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/appointo/doctors")
                : navigate("/appointo/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-[#E2E5FF] text-black "
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-1 ml-16 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6">
  {filterDoc.map((item, index) => (
    <div
      onClick={() => {
        navigate(`/appointo/appointment/${item._id}`);
        scrollTo(0, 0);
      }}
      className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-64 h-80 flex flex-col"
      key={index}
    >
      <img
        className="bg-[#EAEFFF] w-full h-55 object-cover"
        src={item.image}
        alt=""
      />
      <div className="p-4 flex flex-col flex-grow">
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
        <p className="text-[#262626] text-lg font-medium mt-2 flex-grow">
          {item.name}
        </p>
        <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}
