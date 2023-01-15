const express = require('express');
const router = express.Router()
const {validateToken} = require('../jwtTokens/jwt')
const {validateToken2} = require('../jwtTokens/jwtPerson')
const {bankInfo, bankloc, bankcontact} = require('../controllers/BloodBanks')

router.get('/bloodbank/:id', validateToken2, bankInfo)
router.get('/bloodbankloc/:id', validateToken2, bankloc)
router.get('/bloodbankcontact/:id', validateToken2, bankcontact)

module.exports = router