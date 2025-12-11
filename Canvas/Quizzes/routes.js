import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    const findAllQuizzes = async (req, res) => {
        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    };
    const findQuizzesForCourse = async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesForCourse(cid);
        res.json(quizzes);
    };
    const findQuizById = async (req, res) => {
        const { qid } = req.params;
        const quiz = await dao.findQuizById(qid);
        if (!quiz) {
            res.status(404).send("Quiz not found");
            return;
        }
        res.json(quiz);
    };
    const createQuiz = async (req, res) => {
        const { cid } = req.params;
        const quiz = { ...req.body, course: cid };
        const newQuiz = await dao.createQuiz(quiz);
        res.json(newQuiz);
    };
    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        res.json(status);
    };
    const deleteQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.deleteQuiz(qid);
        res.json(status);
    };

    app.get("/api/quizzes", findAllQuizzes);
    app.get("/api/courses/:cid/quizzes", findQuizzesForCourse);
    app.get("/api/quizzes/:qid", findQuizById);
    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.put("/api/quizzes/:qid", updateQuiz);
    app.delete("/api/quizzes/:qid", deleteQuiz);
}
