import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const exists = enrollments.some(
      (e) => e.user === userId && e.course === courseId
    );
    if (exists) return null;
    const enrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };
    db.enrollments = [...enrollments, enrollment];
    return enrollment;
  }
  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    const before = enrollments.length;
    db.enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return { removed: before - db.enrollments.length };
  }
  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.user === userId);
  }
  function findEnrollmentsForCourse(courseId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.course === courseId);
  }
  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
  };
}
