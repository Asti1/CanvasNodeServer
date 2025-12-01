import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("EnrollementModel", schema);
export default model;
