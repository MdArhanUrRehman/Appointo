import express from "express";
const adminRouter = express.Router();
import { loginAdmin, addDoctor, validateDoctorSchema, appointmentAdmin, appointmentCancel, allDoctors, changeAvailability, adminDashboard } from "../controllers/adminControllers.js";
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/multer.js";

adminRouter.post("/login", loginAdmin);
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/appointments", authAdmin, appointmentAdmin);
adminRouter.post("/cancel-appointments", authAdmin, appointmentCancel);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;