const { planets } = require('../../models/planets.model')

function getAllPlanets(req, res) {
    
    // return define only one status, if don't have return the next step is successful (status(200))
    if (!req.body) {
        return res.status(400).json({
            error: "Not find content"
        })
    }
    
    // Define one status
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets,
}