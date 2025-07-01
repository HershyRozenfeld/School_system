import {readFile} from 'node:fs'

function fileReder(){
    readFile(path, 'utf8', (err, data) => {
        if (err){
            console.error(err);
        }
        else {
            // המשך יבוא
        }
    })
}