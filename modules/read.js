import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db', 'db.txt');

/**
 * קורא ומציג את כל התלמידים באמצעות callbacks.
 * @param {(error?: Error, students?: object[]) => void} callback - פונקציית קולבק.
 */
export const readStudents = (callback) => {
  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      // אם הקובץ לא קיים, זה כאילו יש מערך ריק
      if (err.code === 'ENOENT') {
        return callback(null, []);
      }
      return callback(err);
    }
    try {
      const students = JSON.parse(data);
      callback(null, students);
    } catch (parseErr) {
      callback(new Error('Failed to parse database file.'));
    }
  });
};