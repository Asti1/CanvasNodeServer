import mongoose from "mongoose";
import schema from "./schema.js";
const QuizSubmissionModel = mongoose.model("QuizSubmissionModel", schema);
export default QuizSubmissionModel;
