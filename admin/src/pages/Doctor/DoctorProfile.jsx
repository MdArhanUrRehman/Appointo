import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function DoctorProfile() {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  console.log(profileData);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/appointo/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(error.message);
        console.log(error);
      }

      setIsEdit(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-xl border border-gray-300 p-15 ">
          {/* Left: Profile Image */}
          <div className="flex flex-col items-center sm:items-start">
            <img
              className="bg-[#284B63] w-40 h-40 object-cover rounded-lg shadow-md"
              src={profileData.image}
              alt="Doctor"
            />
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                onChange={
                  isEdit
                    ? () =>
                        setProfileData((prev) => ({
                          ...prev,
                          available: !prev.available,
                        }))
                    : undefined
                }
                checked={profileData.available}
                className="w-4 h-4 accent-[#284B63] cursor-pointer"
              />
              <label className="text-sm text-gray-700">Available</label>
            </div>
          </div>

          {/* Right: Info */}
          <div className="sm:col-span-2 flex flex-col gap-3">
            {/* Name & Speciality */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {profileData.name}
              </h2>
              <p className="text-gray-600 mt-1">
                {profileData.degree} - {profileData.speciality}
              </p>
              <span className="inline-block mt-2 px-3 py-1 text-xs bg-[#284B63] text-white rounded-full">
                {profileData.experience}
              </span>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mt-3">
                About
              </h3>
              {isEdit ? (
                <textarea
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-[#284B63]"
                  rows={4}
                  value={profileData.about}
                />
              ) : (
                <p className="text-sm text-gray-600 mt-1">
                  {profileData.about}
                </p>
              )}
            </div>

            {/* Fee */}
            <div>
              <p className="text-gray-700 font-medium">
                Appointment Fee:{" "}
                <span className="text-gray-900 font-semibold">
                  {currency}{" "}
                  {isEdit ? (
                    <input
                      type="number"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm ml-2 w-24"
                      value={profileData.fees}
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>
            </div>

            {/* Address */}
            <div>
              <p className="text-gray-700 font-medium">Address:</p>
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-1"
                  value={profileData.address}
                />
              ) : (
                <p className="text-sm text-gray-600">{profileData.address}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-4 py-2 bg-[#284B63] cursor-pointer text-white text-sm rounded-full hover:bg-[#1f384c] transition-all"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit((prev) => !prev)}
                  className="px-4 py-2 bg-white border cursor-pointer border-[#284B63] text-[#284B63] text-sm rounded-full hover:bg-[#284B63] hover:text-white transition-all"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
