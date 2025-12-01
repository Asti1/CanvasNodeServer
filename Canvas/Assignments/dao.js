import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function AssignmentsDao() {
  function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }
  function createAssignmentForCourse(courseId, assignment) {
    const newAssignment = { ...assignment, _id: uuidv4(), course: courseId };
    return model.create(newAssignment);
  }
  function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }
  async function updateAssignment(assignmentId, assignmentUpdates) {
    await model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
    return model.findById(assignmentId);
  }

  return {
    findAssignmentsForCourse,
    createAssignmentForCourse,
    deleteAssignment,
    updateAssignment,
  };
}
