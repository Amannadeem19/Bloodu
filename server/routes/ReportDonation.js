const express = require('express');
const router = express.Router()
const {validateToken} = require('../jwtTokens/jwt')
const {validateToken2} = require('../jwtTokens/jwtPerson')

const {CountDonations, updateFulfilled, getStatus} = require('../controllers/ReportDonation')

router.get('/report', CountDonations);
router.get('/report1', updateFulfilled);
router.get('/report2/:id', getStatus);

module.exports = router;