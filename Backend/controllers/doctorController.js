import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import appointmentModel from "../models/appointmentModel.js";

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await doctorModel.findOne({ email });

    if (!user) {
      return res.json({ success: true, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    }

    res.json({ success: false, message: "Something went Wrong" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentDoctor = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });
    console.log(appointments)

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCompleted = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appoinment Completed" });
    }

    res.json({ success: false, message: "cant able to Completed appointment" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const dashboard = async (req, res) => {
  try {
    const {docId} = req.body;

    const appointments = await appointmentModel.find({docId});

    let earnings = 0;

    appointments.map((item) => {
      if(item.isCompleted){
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if(!patients.includes(item.userId)){
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments : appointments.length,
      patients : patients.length,
      latestAppointments : appointments.reverse()
    }
    

    res.json({success : true, message : dashData});
  } catch (error) {
    console.log(error)
        res.json({ success: false, message: error.message })
  }
}

const doctorProfile = async (req, res) => {
   try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select('-password');

    res.json({success : true, message : profileData});
   } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
   }
}

const updateDoctorProfile = async (req, res) => {
  try {
    const {docId, fees, address, available, about} = req.body;

    await doctorModel.findByIdAndUpdate(docId, {fees, address, available, about});

    res.json({success :true, message : "profile updated"});
  } catch (error) {
     console.log(error)
     res.json({ success: false, message: error.message })
  }
}

export {
  loginDoctor,
  appointmentCancel,
  appointmentDoctor,
  doctorList,
  changeAvailability,
  appointmentCompleted,
  dashboard,
  updateDoctorProfile,
  doctorProfile,
};
