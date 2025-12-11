import mongoose from "mongoose";

const quizSubmissionSchema = new mongoose.Schema(
  {
    quizId: { type: String, required: true },
    username: { type: String, required: true },
    score: { type: Number, required: true },
    attempt: { type: Number, default: 1 },
    submittedAt: { type: Date, default: Date.now },
    answers: [
      {
        questionId: String,
        answer: mongoose.Schema.Types.Mixed, // Can be string (MC/TF) or string (FitB)
        isCorrect: Boolean,
        points: Number,
      },
    ],
  },
  { collection: "quizSubmissions" }
);

export default quizSubmissionSchema;
