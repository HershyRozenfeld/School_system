import { readFilePromise, writeFilePromise } from './fileHelpers.js';

/**
 * מעדכן תלמיד קיים באמצעות Promises.
 * @param {number} studentId - ה-ID של התלמיד לעדכון.
 * @param {string} updateJson - אובייקט JSON עם השדות לעדכון.
 * @returns {Promise<string>}
 */
export const updateStudent = (studentId, updateJson) => {
  let fieldsToUpdate;
  try {
    fieldsToUpdate = JSON.parse(updateJson);
  } catch (err) {
    // מחזירים Promise שנדחה מיד אם ה-JSON לא תקין
    return Promise.reject(new Error('Invalid JSON format.'));
  }

  return readFilePromise()
    .then(data => {
      const students = JSON.parse(data);
      const studentIndex = students.findIndex(s => s.id === studentId);

      if (studentIndex === -1) {
        throw new Error(`Student with ID ${studentId} not found.`);
      }

      // מעדכנים רק את השדות שסופקו
      students[studentIndex] = { ...students[studentIndex], ...fieldsToUpdate };
      
      const updatedData = JSON.stringify(students, null, 2);
      return writeFilePromise(updatedData);
    })
    .then(() => {
      // אם הכתיבה הצליחה, מחזירים הודעת הצלחה
      return `Student with ID ${studentId} updated successfully.`;
    });
};