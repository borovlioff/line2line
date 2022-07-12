import data from './data.mjs';
import {createObjectCsvWriter}  from "csv-writer";

let str = data;

const csvWriter = createObjectCsvWriter({
    path: 'data.csv',
    header: [
        {id: 'first_line', title: 'Dirst_line'},
        {id: 'second_line', title: 'Second_line'}
    ]
});

function getNearestSpaсe(str, indexNearest) {
    let indices = []
    for (let i = 0; i < str.length; i++) {
        if(i > indexNearest-1) { return indices[indices.length-1] }
        if (str[i] === " ") { indices.push(i); }
    }
}

function att(str) {
    let array = str.split(`\n`);
    for (let i = 0; i < array.length; i++) {
        let line = array[i];
     
        if (line.length > 30) {
            let indexSpace = getNearestSpaсe(line, 33);
            let new_line = line.substring(0,indexSpace);
            let two_line = line.substring(indexSpace);
            two_line = two_line.trim();
            array[i] = { first_line: new_line, second_line:two_line};

        } else {
            array[i] = { first_line: line, second_line:"Красноярск"};
        }
    }

    return array;
}



async function Start(){
    let array = await att(str);
    await csvWriter.writeRecords(array) 
    console.log(`Done`)
}

Start()