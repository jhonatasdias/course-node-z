const express = require('express')
const router = express.Router();

const friendsController = require('../controllers/friends.controller')

router.get('/', friendsController.getFriends)
router.get('/:friendId', friendsController.getFriend)
router.post('/', friendsController.postFriend)

module.exports = router;