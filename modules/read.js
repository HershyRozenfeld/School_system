import {readFile, writeFile} from 'node:fs'

function fileReder(path, write){
    readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        else if (write){
            
            writeFile(path, data, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
    })
}