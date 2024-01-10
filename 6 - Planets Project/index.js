const parse = require('csv-parse');
const fs = require('fs');

const resolt = [];

fs.createReadStream('kepler_data.csv')
    .pipe(parse())
    .on("data", (data) => {
        resolt.push(data);
    })
    .on("end", () => {
        console.log(resolt);
        console.log("done!")
    })
    .on("error", (error) => {
        console.log(error);
    })