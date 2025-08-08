import express from "express";
import { loginDoctor, appointmentCancel, doctorProfile, updateDoctorProfile, dashboard, appointmentCompleted, appointmentDoctor, doctorList, changeAvailability } from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.post("/login", loginDoctor);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/appointments", authDoctor, appointmentDoctor);
doctorRouter.get("/list", doctorList);
doctorRouter.post("/change-Availability", authDoctor, changeAvailability);
doctorRouter.post("/complete-appointment", authDoctor, appointmentCompleted);
doctorRouter.get("/dashboard", authDoctor, dashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile)
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)

export default doctorRouter;