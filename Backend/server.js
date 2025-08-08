import express from "express";
import connectDB from "./config/mongodb.js";
import cors from 'cors'
import ExpressError from "./utils/ExpressError.js";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";

const app = express();
const port = process.env.PORT || 8080
connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/appointo", (req, res) => {
  res.send("working");
});

//api endpoints
app.use("/appointo/user", userRouter);
app.use("/appointo/admin", adminRouter);
app.use("/appointo/doctor", doctorRouter);

app.all("{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(err.stack);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on PORT ${port}`);
});