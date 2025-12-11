import * as dao from "./dao.js";

export default function QuizSubmissionRoutes(app) {
  const createSubmission = async (req, res) => {
    const { qid } = req.params;
    const submission = { ...req.body, quizId: qid };
    const newSubmission = await dao.createSubmission(submission);
    res.json(newSubmission);
  };

  const findSubmissionsForUser = async (req, res) => {
    const { qid, username } = req.params;
    const submissions = await dao.findSubmissionsForUser(qid, username);
    res.json(submissions);
  };

  const findLatestSubmission = async (req, res) => {
    const { qid, username } = req.params;
    const submission = await dao.findLatestSubmission(qid, username);
    res.json(submission);
  };

  app.post("/api/quizzes/:qid/submissions", createSubmission);
  app.get("/api/quizzes/:qid/submissions/:username", findSubmissionsForUser);
  app.get("/api/quizzes/:qid/submissions/:username/latest", findLatestSubmission);
}
