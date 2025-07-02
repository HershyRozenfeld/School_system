import fs from 'fs';
import path from 'path';

// נגדיר את הנתיב לקובץ הדאטהבייס פעם אחת כדי לא לחזור על עצמנו
const DB_PATH = path.join(process.cwd(), 'db', 'db.txt');

/**
 * פונקציה שעוטפת את fs.readFile ומחזירה Promise.
 * @returns {Promise<string>} Promise שמחזיר את תוכן הקובץ כטקסט.
 */
export const readFilePromise = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
      if (err) {
        // אם הקובץ לא קיים, נחזיר מערך ריק במקום שגיאה
        if (err.code === 'ENOENT') {
          return resolve('[]');
        }
        return reject(err);
      }
      resolve(data);
    });
  });
};

/**
 * פונקציה שעוטפת את fs.writeFile ומחזירה Promise.
 * @param {string} content - התוכן שייכתב לקובץ.
 * @returns {Promise<void>} Promise שמסתיים כשהכתיבה הושלמה.
 */
export const writeFilePromise = (content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(DB_PATH, content, 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};