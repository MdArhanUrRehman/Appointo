import { useContext, useState, useEffect } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios";
import { toast } from 'react-toastify'


export default function MyAppointment(){

    const {backendUrl, token } = useContext(AppContext);

    const [appointments, setAppointments] = useState([]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/appointo/user/appointments', {headers : {token}});
            setAppointments(data.message.reverse());
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/appointo/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

     useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return(
       <div className="pb-10 min-h-[calc(100vh-100px)] flex flex-col">
  <p className="ob-3 mt-12 text-lg font-medium text-gray-600 border-b">My Appointment</p>

  <div className="flex-1">
    {appointments.length > 0 ? (
      appointments.map((item, index) => (
        <div
          className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b border-gray-300"
          key={index}
        >
          <div>
            <img className="w-36 bg-[#EAEFFF]" src={item.docData.image} alt="" />
          </div>
          <div className="flex-1 text-sm text-[#5E5E5E]">
            <p className="text-[#262626] text-base font-semibold">{item.docData.name}</p>
            <p>{item.docData.speciality}</p>
            <p className="text-[#464646] font-medium mt-1">Address:</p>
            <p className="">{item.docData.address}</p>
            <p className="mt-1">
              <span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span>{" "}
              {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
          </div>
          <div></div>
          <div className="flex flex-col gap-2 justify-end text-sm text-center">
            {!item.cancelled && !item.payment && !item.isCompleted && (
              <button
                onClick={() => setPayment(item._id)}
                className="text-[#696969] sm:min-w-48 py-2 border border-gray-400 cursor-pointer rounded hover:bg-[#284B63] hover:text-white transition-all duration-300"
              >
                Pay Online
              </button>
            )}

            {item.isCompleted && (
              <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                Completed
              </button>
            )}

            {!item.cancelled && !item.isCompleted && (
              <button
                onClick={() => cancelAppointment(item._id)}
                className="text-[#696969] sm:min-w-48 py-2 border border-gray-400 cursor-pointer rounded hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Cancel appointment
              </button>
            )}
            {item.cancelled && !item.isCompleted && (
              <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                Appointment cancelled
              </button>
            )}
          </div>
        </div>
      ))
    ) : (
      <div className="flex-grow" /> // Empty div that grows to push footer down
    )}
  </div>
</div>

    )
}