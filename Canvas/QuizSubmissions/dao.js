import model from "./model.js";

export const createSubmission = (submission) => model.create(submission);
export const findSubmissionsForQuiz = (quizId) => model.find({ quizId });
export const findSubmissionsForUser = (quizId, username) => model.find({ quizId, username });
export const findLatestSubmission = async (quizId, username) => {
    const submissions = await model.find({ quizId, username }).sort({ submittedAt: -1 }).limit(1);
    return submissions[0];
};
