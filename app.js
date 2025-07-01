import readline from 'readline' 

const rl = readline.createInterface({
    input: process.stdin,
    output: proscess.stdout
});

function promptUser(){
    rl.question('What action would you like to perform? (create, read, update, delete, exit): ', (answer) => {
        console.log(`Your choice: ${answer}`);
        rl.close();
    });
}

promptUser()