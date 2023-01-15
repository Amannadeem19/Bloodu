const express = require('express');
const router = express.Router()
const {validateToken} = require('../jwtTokens/jwt')
const {validateToken2} = require('../jwtTokens/jwtPerson')
const {CreateRequest, getAllRequests, getRequests, deleteRequest, updateRequest} = require('../controllers/Request');


router.post('/create',validateToken2, CreateRequest);
router.get('/myrequests', validateToken2, getRequests);
router.delete('/delete/:id', validateToken2, deleteRequest);
router.put('/update/:id', validateToken2, updateRequest)
router.get('/requests',getAllRequests)


module.exports = router;