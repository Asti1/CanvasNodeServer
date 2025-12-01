import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    // const { enrollments } = db;
    // const exists = enrollments.some(
    //   (e) => e.user === userId && e.course === courseId
    // );
    // if (exists) return null;
    // const enrollment = {
    //   _id: uuidv4(),
    //   user: userId,
    //   course: courseId,
    // };
    // db.enrollments = [...enrollments, enrollment];
    // return enrollment;
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }
  // function unenrollUserFromCourse(userId, courseId) {
  //   const { enrollments } = db;
  //   const before = enrollments.length;
  //   db.enrollments = enrollments.filter(
  //     (e) => !(e.user === userId && e.course === courseId)
  //   );
  //   return { removed: before - db.enrollments.length };
  // }
  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  function findEnrollmentsForUser(userId) {
    return model.find({ user: userId });
  }
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  }
  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  function findEnrollmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }
  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    findCoursesForUser,
    findUsersForCourse,
    unenrollAllUsersFromCourse,
  };
}
