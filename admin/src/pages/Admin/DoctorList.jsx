import { useContext, useEffect } from "react"
import { AdminContext } from '../../context/AdminContext';


export default function DoctorList(){

    const {doctors, changeAvailability, aToken, getAllDoctors} = useContext(AdminContext);

    useEffect(() => {
        if(aToken){
            getAllDoctors();
        }
    }, [aToken]);

    return(
        <div className="m-5 max-h-[90vh] overflow-y-auto">
  <h1 className="text-xl font-medium mb-4">All Doctors</h1>
  <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
    {doctors?.map((item, index) => (
      <div
        key={index}
        className="border border-[#C9D8FF] rounded-xl w-56 overflow-hidden cursor-pointer group"
        onClick={() => {
          navigate(`/appointo/appointment/${item._id}`);
          scrollTo(0, 0);
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          className="bg-[#C9D8FF] w-full h-40 object-cover group-hover:bg-[#284B63] transition-colors duration-500"
        />
        <div className="p-4">
          <p className="text-[#262626] text-lg font-medium">{item.name}</p>
          <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
          <div className="mt-2 flex items-center gap-1 font-medium">
            <input
              type="checkbox"
              onChange={() => changeAvailability(item._id)}
              checked={item.available}
              className="cursor-pointer"
            />
            <p>Available</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    )
}