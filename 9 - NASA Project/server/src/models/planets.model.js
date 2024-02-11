const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path')
const planets = require('./planets.mongo');

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
            .on("data", async (data) => {
                if(isHabitablePlanet(data)) {
                    savePlanet(data);
                }
            })
            .on("end", async () => {
                // essa mensagem é muito importante para identificar se não for pelo método asynchroun o servidor eh inicado primeiro depois os dados
                // mas pelo método asynchroun os dados são iniciados primeiro depois o servidor é iniciado, sem isso ocorre um erro no carregamento
                // dos dados no front-end
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log("Habitable planets found:", countPlanetsFound)
                console.log("done!")
                resolve();
            })
            .on("error", (error) => {
                console.log(error);
                reject(error);
            })

    })
}

async function getAllPlanets() {
    // return habitablePlanet;
    // return habitablePlanet.find({
    //     keplerName: 'Kepler-62 f' // filter only resolt with property
    // }, {
    //     'keplerName': 0, // exclude the result
    //     'keplerName': 1 // show the keplerName in result
    // })
    // return habitablePlanet.find({
    //     keplerName: 'Kepler-62 f' // filter only resolt with property
    // }, 'keplerName -anotherProperty') // (-) exclude the result
    
    // filter id and v
    // return await planets.find({}, '-_id -__v');
    return await planets.find({}, {
        _id: 0,
        __v: 0
    });
}

async function savePlanet(planet) {
    
    try {
        // To do: Replace below create with insert + update = upsert
        await planets.updateOne({
            keplerName: planet.kepler_name // filter «Object»
        }, {
            keplerName: planet.kepler_name // update «Object|Array»
        }, {
            upsert: true    //  [options] «Object» optional see Query.prototype.setOptions()
                            //  [options.upsert=false] «Boolean» if true, and no documents found, insert a new document
        });
        // No more in memory, now in MongoDB
        // habitablePlanet.push(data);
    } catch (error) {
        console.error(`Could not save planet ${error}`);
    }

}

module.exports = { 
    loadPlanetsData,
    getAllPlanets 
}