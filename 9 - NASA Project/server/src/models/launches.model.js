const axios = require('axios');

const launchesDatabse = require('./launches.mongo');
const planetsDatabse = require('./planets.mongo');
// const launches = new Map();

// let latestFlightNumber = 100;

const DEFAULT_FLIGHT_NUMBER = 100;

// const launch = {
//     flightNumber: 100, // flight_number
//     mission: "Kepler Exploration X", // name
//     rocket: "Explorer IS1", // rocket.name
//     launchDate: new Date('December 27, 2030'), // date_local
//     target: "Kepler-442 b", // not applicable
//     customers: [ "ZTM", "NASA" ], // payload.customers for each payload
//     upcoming: true, // upcoming
//     success: true // success
// }

// saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {

    console.log('Downloading launch data...');

    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    });

    if(response.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed')
    }
    
    const launchDocs = response.data.docs;

    // const list = [];

    for(const launchDoc of launchDocs) {
        const playloads = launchDoc['payloads'];

        const customers = playloads.flatMap((playload) => { 
            return playload.customers;
         });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers
        };

        // list.push(launch)

        await saveLaunch(launch);

        console.log(`${launch.flightNumber} ${launch.mission}`)
    }

    // console.log(list);

}

async function loadLaunchesData() {

    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    });

    if(firstLaunch) {
        console.log('Launch data already loaded');
        return;
    } else {
        await populateLaunches();
    }
   
}

async function saveLaunch(newLaunch) {

    //change .updateOne() for .findOneAndUpdate()    
    await launchesDatabse.findOneAndUpdate({
        flightNumber: newLaunch.flightNumber // if this data has been changed, it will be new data / Attention: it also serves as a filter
    }, newLaunch, { 
        upsert: true
    })

}

async function scheduleNewLaunh(launch) {

    const planet = await planetsDatabse.findOne({ // return one object if exist and null if no exist
        keplerName: newLaunch.target
    })

    if(!planet) {
        throw new Error('No matiching planet found');
    }

    const newFlightNumber = await getLatestFlightNumber() + 1;
    
    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        success: true, 
        upcoming: true, 
        customers: [ "Zero to Mastery", "NASA" ]
    })

    await saveLaunch(newLaunch);
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabse
        .findOne()
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

// launches.set(launch.flightNumber, launch);



async function getAllLaunches(skip, limit) {
    // return Array.from(launches.values());

    return await launchesDatabse
        .find({}, '-_id -__v')
        .sort({ flightNumber: 1 })
        .skip(skip)
        .limit(limit);
}

// function addNewLaunch(launch) {
//     latestFlightNumber++;
//     launches.set(latestFlightNumber, 
//         Object.assign(launch, {
//             flightNumber: latestFlightNumber,
//             success: true,
//             upcoming: true,
//             customer: [ "Zero to Mastery", "NASA" ]
//         }));
// }

async function findLaunch(filter) {
    return await launchesDatabse.findOne(filter);
}

async function existLaunchWithId(launchId) {
    // return launches.has(launchId);
    return await findLaunch({
        flightNumber: launchId
    })
}

async function abortLaunchById(launchId) {
    // const aborted = launches.get(launchId)
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted;

    const aborted = await launchesDatabse.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false, 
        success: false
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    loadLaunchesData,
    //addNewLaunch,
    scheduleNewLaunh,
    existLaunchWithId,
    abortLaunchById
}