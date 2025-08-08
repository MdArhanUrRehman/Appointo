import mongoose from "mongoose";
import { Schema } from "mongoose";

const doctorSchema = new Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    image : {type : String, required : true},
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
    address: { type: String, required: true },
    date: { type: Number, required: true },
}, { minimize: false })

const doctorModel =  mongoose.models.doctor || mongoose.model("Doctor", doctorSchema);
export default doctorModel;