import EnrollmentsDao from "./dao.js";
import CoursesDao from "../Courses/dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();
  const coursesDao = CoursesDao();
  const findCoursesForUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.role === "ADMIN") {
      const courses = await coursesDao.findAllCourses();
      res.json(courses);
      return;
    }
    let { uid } = req.params;
    if (uid === "current") {
      uid = currentUser._id;
    }
    const courses = await dao.findCoursesForUser(uid);
    res.json(courses);
  };
  const enroll = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    try {
      const enrollment = await dao.enrollUserInCourse(userId, courseId);
      res.json(enrollment);
    } catch (e) {
      res.status(400).json({ message: "Already enrolled" });
    }
  };

  const unenroll = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const status = await dao.unenrollUserFromCourse(userId, courseId);
    res.json(status);
  };

  const findForUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findForCourse = async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    // const courses = await dao.findCoursesForEnrolledUser(userId);
    const courses = await dao.findCoursesForUser(userId);
    res.json(courses);
  };
  app.post("/api/users/:userId/courses/:courseId/enroll", enroll);
  app.delete("/api/users/:userId/courses/:courseId/enroll", unenroll);
  app.get("/api/users/:userId/enrollments", findForUser);
  app.get("/api/courses/:courseId/enrollments", findForCourse);
  // Route for user courses is handled in Courses/routes.js to avoid duplication
}
