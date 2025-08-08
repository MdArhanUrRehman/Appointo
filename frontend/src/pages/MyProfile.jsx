import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import upload_icon from "../assets/upload_area.png";

export default function MyProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  // console.log(userData.message[0].name);
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/appointo/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="max-w-lg mx-auto my-10 flex flex-col gap-6 text-sm py-8 px-4 bg-white rounded-lg shadow-2xl">
      {/* Profile Image */}
      <div className="flex flex-col items-center gap-3">
        <label htmlFor="image" className="relative group cursor-pointer">
          <img
            className="w-32 h-32 rounded-full object-cover border"
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="Profile"
          />
          {isEdit && (
            <>
            <img
              className="absolute bottom-0 right-0 w-8 h-8"
              src={upload_icon}
              alt="Upload"
            />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
            </>
          )}
        </label>

        {/* Name */}
        {isEdit ? (
          <input
            className="text-2xl font-medium text-center bg-gray-100 px-3 py-1 rounded"
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
          />
        ) : (
          <p className="text-2xl font-semibold text-[#262626] mt-2">
            {userData.name}
          </p>
        )}
      </div>

      {/* Contact Info */}
      <div>
        <p className="text-gray-700 underline font-medium mb-2">
          Contact Information
        </p>
        <div className="grid grid-cols-[100px_1fr] gap-y-3 text-gray-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-600">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded w-full"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded w-full"
              type="text"
              value={userData.address}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.address}</p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-gray-700 underline font-medium mb-2">
          Basic Information
        </p>
        <div className="grid grid-cols-[100px_1fr] gap-y-3 text-gray-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="w-36 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#284B63] focus:border-[#284B63] transition duration-200"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="w-36 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#284B63] focus:border-[#284B63] transition duration-200"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center pt-4">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="px-6 py-2 bg-[#284B63] text-white rounded-full hover:bg-[#284B63] cursor-pointer transition"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 border border-[#284B63] cursor-pointer text-[#284B63] rounded-full hover:bg-[#284B63] hover:text-white transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  ) : null;
}
