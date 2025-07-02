import readline from 'readline';
import { createStudent } from './create.js';
import { readStudents } from './read.js';
import { updateStudent } from './update.js';
import { deleteStudent } from './delete.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const showMenu = () => {
  console.log('\n--- School DB Menu ---');
  console.log('1. Create a new student (create)');
  console.log('2. Read all students (read)');
  console.log('3. Update a student (update)');
  console.log('4. Delete a student (delete)');
  console.log('5. Exit (exit)');
  console.log('----------------------');
};

const handleCreate = () => {
  rl.question('Enter student JSON (e.g., {"id": 1, "name": "John"}): ', (studentJson) => {
    createStudent(studentJson, (err, result) => {
      if (err) {
        console.error('Error:', err.message);
      } else {
        console.log(result);
      }
      mainLoop();
    });
  });
};

const handleRead = () => {
  readStudents((err, students) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('--- All Students ---');
      console.log(JSON.stringify(students, null, 2));
    }
    mainLoop();
  });
};

const handleUpdate = () => {
  rl.question('Enter student ID to update: ', (idStr) => {
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      console.error('Invalid ID.');
      mainLoop();
      return;
    }
    rl.question('Enter fields to update as JSON (e.g., {"grade": "B"}): ', (updateJson) => {
      updateStudent(id, updateJson)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.error('Error:', err.message);
        })
        .finally(() => {
          mainLoop();
        });
    });
  });
};

const handleDelete = () => {
  rl.question('Enter student ID to delete: ', (idStr) => {
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      console.error('Invalid ID.');
      mainLoop();
      return;
    }
    deleteStudent(id)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error('Error:', err.message);
      })
      .finally(() => {
        mainLoop();
      });
  });
};

const mainLoop = () => {
  showMenu();
  rl.question('Choose an operation: ', (operation) => {
    switch (operation.trim().toLowerCase()) {
      case 'create':
        handleCreate();
        break;
      case 'read':
        handleRead();
        break;
      case 'update':
        handleUpdate();
        break;
      case 'delete':
        handleDelete();
        break;
      case 'exit':
        console.log('Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid operation. Please try again.');
        mainLoop();
    }
  });
};

export const startApp = () => {
  mainLoop();
};