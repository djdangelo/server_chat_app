const { Router } = require('express');
const validateJwt = require('../middleware/validate.jwt');
const messageController = require('../controllers/messages.controller');

const router = Router();

router.get('/:fromId', validateJwt, messageController.getMessages);

module.exports = router;