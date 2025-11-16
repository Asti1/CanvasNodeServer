import { v4 as uuidv4 } from "uuid";
export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    const { assignments } = db;
    return assignments.filter((a) => a.course === courseId);
  }
  function createAssignmentForCourse(courseId, assignment) {
    const newAssignment = { ...assignment, _id: uuidv4(), course: courseId };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }
  function deleteAssignment(assignmentId) {
    const { assignments } = db;
    db.assignments = assignments.filter((a) => a._id !== assignmentId);
    return { status: "ok" };
  }
  function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = db;
    const assignment = assignments.find((a) => a._id === assignmentId);
    if (!assignment) return null;
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }

  return {
    findAssignmentsForCourse,
    createAssignmentForCourse,
    deleteAssignment,
    updateAssignment,
  };
}