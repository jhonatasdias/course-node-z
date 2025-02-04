const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanet = [];
var count = 0;

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] == 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on("data", (data) => {
        if(isHabitablePlanet(data)) {
            habitablePlanet.push(data);
            count++;
        }
    })
    .on("end", () => {
        console.log(habitablePlanet.map(planet => {
            return planet['kepler_name'] // filtre for name
        }));
        console.log("Habitable planets found:", count)
        console.log("done!")
    })
    .on("error", (error) => {
        console.log(error);
    })