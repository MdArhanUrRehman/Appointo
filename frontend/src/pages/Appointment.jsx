import verified from "../assets/verified_icon.svg";
import info_icon from "../assets/info_icon.svg";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Appointment() {
  const { docId } = useParams();
  const { doctor, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctor.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSolts = async () => {
    setDocSlots([]);

    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Build base date for morning and evening
      const baseDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      // Morning: 9:00 AM to 2:00 PM
      const morningStart = new Date(baseDate);
      const morningEnd = new Date(baseDate);
      morningStart.setHours(10, 0, 0, 0);
      morningEnd.setHours(14, 0, 0, 0);

      // Evening: 5:00 PM to 9:00 PM
      const eveningStart = new Date(baseDate);
      const eveningEnd = new Date(baseDate);
      eveningStart.setHours(17, 0, 0, 0);
      eveningEnd.setHours(21, 0, 0, 0);

      let timeSlots = [];

      const generateSlots = (start, end) => {
        const curr = new Date(start);
        while (curr < end) {
          const formattedTime = curr.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const day = curr.getDate();
          const month = curr.getMonth() + 1;
          const year = curr.getFullYear();

          const slotDate = `${day}_${month}_${year}`;
          const slotTime = formattedTime;

          // console.log(formattedTime)

          const isSlotAvailable =
            !docInfo.slots_booked[slotDate]?.includes(slotTime);

          if (isSlotAvailable) {
            timeSlots.push({
              datetime: new Date(curr),
              time: formattedTime,
            });
          }

          curr.setMinutes(curr.getMinutes() + 30);
        }
      };

      // If today, ensure we skip past time
      const isToday = today.toDateString() === date.toDateString();
      if (isToday) {
        const now = new Date();
        if (now < morningEnd) {
          const adjustedMorningStart = new Date(Math.max(now, morningStart));
          adjustedMorningStart.setMinutes(now.getMinutes() > 30 ? 0 : 30);
          generateSlots(adjustedMorningStart, morningEnd);
        }
        if (now < eveningEnd) {
          const adjustedEveningStart = new Date(Math.max(now, eveningStart));
          adjustedEveningStart.setMinutes(now.getMinutes() > 30 ? 0 : 30);
          generateSlots(adjustedEveningStart, eveningEnd);
        }
      } else {
        generateSlots(morningStart, morningEnd);
        generateSlots(eveningStart, eveningEnd);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment");
      return navigate("/login");
    }

    const date = docSlots[slotIndex][0].datetime;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = day + "_" + month + "_" + year;

    // console.log(docId, slotDate, slotTime);

    try {
      const { data } = await axios.post(
        backendUrl + "/appointo/user/book-appointments",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/appointo/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctor?.length > 0) {
      fetchDocInfo();
    }
  }, [doctor, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSolts();
    }
  }, [docInfo]);

  return docInfo ? (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            src={docInfo.image}
            alt=""
            className="bg-[#284B63] w-full sm:max-w-72 rounded-lg"
          />
        </div>

        <div className="flex-1 border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {docInfo.name} <img src={verified} alt="" />
          </p>
          <div className="flex items-ceter gap-2 mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
              About <img className="w-3" src={info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-800">
              {currencySymbol}
              {docInfo.fees}
            </span>{" "}
          </p>
        </div>
      </div>

      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-[#284B63] text-white"
                    : "border border-[#DDDDDD]"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="relative w-full mt-4">
          <div className="flex items-center gap-3 overflow-x-auto scroll-smooth px-4 pb-2 hide-scrollbar">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-colors duration-200 ${
                    item.time === slotTime
                      ? "bg-[#284B63] text-white"
                      : "text-[#949494] border border-[#B4B4B4]"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
        </div>

        <button
          onClick={bookAppointment}
          className="bg-[#284B63] cursor-pointer text-white text-sm font-light px-20 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>
    </div>
  ) : null;
}
