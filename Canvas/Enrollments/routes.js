import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enroll = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    if (!enrollment) {
      res.status(400).json({ message: "Already enrolled" });
      return;
    }
    res.json(enrollment);
  };

  const unenroll = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const status = dao.unenrollUserFromCourse(userId, courseId);
    res.json(status);
  };

  const findForUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  app.post("/api/users/:userId/courses/:courseId/enroll", enroll);
  app.delete("/api/users/:userId/courses/:courseId/enroll", unenroll);
  app.get("/api/users/:userId/enrollments", findForUser);
  app.get("/api/courses/:courseId/enrollments", findForCourse);
}