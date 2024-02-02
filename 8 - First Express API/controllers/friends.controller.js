const model = require('../models/friends.model');

function getFriends(req, res) {
    // Express define content-type automatic
    // res.send('Hellloooo!');// content-type:text-html
    // res.send({ id: 1, name: 'Isaac Newton' }) // content-type: application/json
    res.json(model);

}

function getFriend(req, res) {
    const friendId = Number(req.params.friendId); // tranfer string to number
    const friend = model[friendId];

    console.log(typeof(friendId)); // check that it is a number or string

    if (friend) {
        res.status(200).json(friend);
        // res.json(friend);
    } else {
        res.status(404).json({
            error: 'Friend does not exist'
        })
    }
}

function postFriend(req, res) {

    if (!req.body.name) {
        return res.status(400).json({
            error: 'Missing friend name'
        })
    }

    const newFriend = {
        name: req.body.name,
        id: model.length
    };

    model.push(newFriend);

    res.json(newFriend);
}

module.exports = {
    getFriends,
    getFriend,
    postFriend
}