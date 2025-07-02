import { readFilePromise, writeFilePromise } from './fileHelpers.js';

/**
 * מוחק תלמיד באמצעות Promises.
 * @param {number} studentId - ה-ID של התלמיד למחיקה.
 * @returns {Promise<string>}
 */
export const deleteStudent = (studentId) => {
  return readFilePromise()
    .then(data => {
      let students = JSON.parse(data);
      const initialLength = students.length;
      students = students.filter(s => s.id !== studentId);

      if (students.length === initialLength) {
        throw new Error(`Student with ID ${studentId} not found.`);
      }
      
      const updatedData = JSON.stringify(students, null, 2);
      return writeFilePromise(updatedData);
    })
    .then(() => {
      return `Student with ID ${studentId} deleted successfully.`;
    });
};