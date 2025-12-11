import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    course: { type: String, required: true },
    quizType: {
      type: String,
      enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
      default: "GRADED_QUIZ",
    },
    points: { type: Number, default: 0 },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 }, // in minutes
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: false }, // Simplified for now
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    published: { type: Boolean, default: false },
    questions: [
        {
          title: String,
          points: Number,
          questionType: {
             type: String,
             enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
             default: "MULTIPLE_CHOICE"
          },
          questionText: String,
          choices: [
            {
                text: String,
                isCorrect: Boolean
            }
          ]
        }
    ]
  },
  { collection: "quizzes" }
);
export default quizSchema;
