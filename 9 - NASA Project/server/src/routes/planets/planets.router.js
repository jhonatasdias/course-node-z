const express = require('express')
const router = express.Router();

// const planetsController = require('./planets.controller')

const {
    htppGetAllPlanets,
} = require('./planets.controller')

router.get('/', htppGetAllPlanets);


module.exports = router;