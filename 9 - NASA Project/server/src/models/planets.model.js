const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path')
const planets = require('./planets.mongo');

const habitablePlanet = [];
var count = 0;

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] == 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

const filePath = path.join(__dirname, '../../data/kepler_data.csv')

function loadPlanetsData() {
    return new Promise((resolve, reject) => {

        fs.createReadStream(filePath)
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
                // essa mensagem é muito importante para identificar se não for pelo método asynchroun o servidor eh inicado primeiro depois os dados
                // mas pelo método asynchroun os dados são iniciados primeiro depois o servidor é iniciado, sem isso ocorre um erro no carregamento
                // dos dados no front-end
                console.log("Habitable planets found:", count)
                console.log("done!")
                resolve();
            })
            .on("error", (error) => {
                console.log(error);
                reject(error);
            })

    })
}

function getAllPlanets() {
    return habitablePlanet;
}

module.exports = { 
    loadPlanetsData,
    getAllPlanets 
}