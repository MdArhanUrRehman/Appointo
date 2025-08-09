import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "email-validator";
import { v2 as cloudinary } from "cloudinary";
import doctorSchemaValidate from "../validationSchema/doctorSchema.js";

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          data: email + password,
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "2d" }
      );
      console.log(token)
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      experience,
      fees,
      speciality,
      degree,
      address,
      about,
    } = req.body;


    const imageFile = req.file;

    const emailValidate = validator.validate(email);

    if (!emailValidate) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPasssword = await bcrypt.hash(password, salt);
    console.log(hashPasssword);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    // console.log(imageUpload);

    const doctorData = {
      name,
      email,
      image: imageUpload.secure_url,
      password: hashPasssword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added" });

    console.log(newDoctor);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const validateDoctorSchema = (req, res, next) => {
  let { error, value } = doctorSchemaValidate().validate(req.body);
  console.log(value);
  if (error) {
    let errMsg = error.details[0].message;
    console.log(errMsg);
    return res.json({ success: false, message: errMsg });
  } else {
    next();
  }
};

const appointmentAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const changeAvailability = async (req, res) => {
    try{
       const { docId } = req.body;
       const docData = await doctorModel.findById(docId);
       await doctorModel.findByIdAndUpdate(docId, {available : !docData.available});
       res.json({success : true, message : "Availability Changed"});
    }catch(error){
       console.log(error);
       res.json({ success: false, message: error.message });
    }
}

const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const user = await userModel.find({});
        const appointments = await  appointmentModel.find({});

        const dashData = {
            doctors : doctors.length,
            appointments : appointments.length,
            patients : user.length,
            latestAppointments : appointments.reverse()
        }


        res.json({ success : true, message : dashData});
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

export {
  loginAdmin,
  addDoctor,
  validateDoctorSchema,
  appointmentAdmin,
  appointmentCancel,
  allDoctors,
  changeAvailability,
  adminDashboard,
};
