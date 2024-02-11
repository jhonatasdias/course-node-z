const launchesDatabse = require('./launches.mongo');
const planetsDatabse = require('./planets.mongo');
// const launches = new Map();

// let latestFlightNumber = 100;

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    target: "Kepler-442 b",
    customers: [ "ZTM", "NASA" ],
    upcoming: true,
    success: true
}

saveLaunch(launch);

async function saveLaunch(newLaunch) {

    const planet = await planetsDatabse.findOne({ // return one object if exist and null if no exist
        keplerName: newLaunch.target
    })

    if(!planet) {
        throw new Error('No matiching planet found');
    }

    //change .updateOne() for .findOneAndUpdate()

    await launchesDatabse.findOneAndUpdate({
        flightNumber: newLaunch.flightNumber // if this data has been changed, it will be new data / Attention: it also serves as a filter
    }, newLaunch, { 
        upsert: true
    })
}

async function scheduleNewLaunh(launch) {
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



async function getAllLaunches() {
    // return Array.from(launches.values());
    return await launchesDatabse.find({}, '-_id -__v');
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

async function existLaunchWithId(launchId) {
    // return launches.has(launchId);
    return await launchesDatabse.findOne({
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
    //addNewLaunch,
    scheduleNewLaunh,
    existLaunchWithId,
    abortLaunchById
}