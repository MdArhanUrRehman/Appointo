import userModel from "../models/userModel.js";
import userSchemaValidate from "../validationSchema/userSchema.js";
import validator from "email-validator";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from 'bcrypt';

const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailValidate = validator.validate(email);

    if (!emailValidate) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPasssword = bcrypt.hashSync(password, salt);

    const userData = {
      name,
      email,
      password: hashPasssword,
    };

    const emailExist = await userModel.findOne({ email });
    if(emailExist){
      return res.json({success : false, message : "User email already exists"});
    }

    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "7d" });

    res.json({ success: true, message: token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const validateUser = (req, res, next) => {
  let { error, value } = userSchemaValidate().validate(req.body);
  console.log(value);
  if (error) {
    let errMsg = error.details[0].message;
    console.log(errMsg);
    return res.json({ success: false, message: errMsg });
  } else {
    next();
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);
      return res.json({ success: true, message: token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log(userId)
    const userData = await userModel.findById(userId).select("-password");
    // console.log(userData)

    res.json({ success: true, message: userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.file)

    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;


    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address,
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const bookAppointments = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not available" });
    }

    const slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({userId});

    res.json({ success : true, message : appointments});
  } catch (error) {
    console.log(error);
    res.json({ success : false, message : error.message});
  }
}

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if(appointmentData.userId !== userId){
      return res.json({success : false, message : "Unauthorized action"});
    }

    await appointmentModel.findByIdAndUpdate(appointmentData, { cancelled : true});

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter( e => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, {slots_booked});

    res.json({success : true, message : "Appointment Cancelled"});
    
  } catch (error) {
     console.log(error)
     res.json({ success: false, message: error.message })
  }
}

export { signUpUser, validateUser, loginUser , cancelAppointment, getProfile, updateProfile, listAppointment, bookAppointments, };
