import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db', 'db.txt');

/**
 * יוצר תלמיד חדש באמצעות callbacks.
 * @param {string} studentJson - אובייקט תלמיד בפורמט JSON string.
 * @param {(error?: Error, result?: string) => void} callback - פונקציית קולבק.
 */
export const createStudent = (studentJson, callback) => {
  let newStudent;
  try {
    // ולידציית JSON בסיסית
    newStudent = JSON.parse(studentJson);
    if (!newStudent.id || !newStudent.name) {
        throw new Error("Invalid student format. 'id' and 'name' are required.");
    }
  } catch (err) {
    return callback(new Error('Invalid JSON format or missing fields.'));
  }

  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return callback(err);
    }

    const students = (err && err.code === 'ENOENT') ? [] : JSON.parse(data);
    
    // בודק אם קיים כבר תלמיד עם אותו ID
    if (students.some(s => s.id === newStudent.id)) {
        return callback(new Error(`Student with ID ${newStudent.id} already exists.`));
    }

    students.push(newStudent);

    fs.writeFile(DB_PATH, JSON.stringify(students, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        return callback(writeErr);
      }
      callback(null, 'Student created successfully!');
    });
  });
};