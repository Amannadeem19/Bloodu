const express = require('express')
const router = express.Router()

const {RegisterP, LoginP} = require('../controllers/authPerson')

router.post('/RegisterP', RegisterP)
router.post('/LoginP',LoginP)

module.exports = router;