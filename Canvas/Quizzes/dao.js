import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createQuiz = (quiz) => {
    const newQuiz = { ...quiz, _id: uuidv4() };
    return model.create(newQuiz);
}
export const findAllQuizzes = () => model.find();
export const findQuizzesForCourse = (courseId) => model.find({ course: courseId });
export const findQuizById = (quizId) => model.findById(quizId);
export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
