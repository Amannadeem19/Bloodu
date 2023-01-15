const express = require('express');
const router = express.Router()
const {validateToken} = require('../jwtTokens/jwt')
const {validateToken2} = require('../jwtTokens/jwtPerson')

const {Donate,postDonate, getAllDonations} = require('../controllers/Donate');

router.get('/donate', validateToken2, Donate)
router.post('/postdonate', validateToken2, postDonate)
router.get('/getDonations',validateToken2, getAllDonations)


module.exports = router;