import exress from "express";
import { signUpUser, validateUser, loginUser, cancelAppointment, getProfile, listAppointment, updateProfile, bookAppointments } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = exress.Router();

userRouter.post("/signUp", validateUser, signUpUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile);
userRouter.post("/book-appointments", authUser, bookAppointments);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;

