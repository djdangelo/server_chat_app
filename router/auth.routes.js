const { Router, request} = require('express');
const authController = require('../controllers/auth.controller');
const {check} = require("express-validator");
const validatorFields = require("../middleware/validator.fields");
const validateJwt = require("../middleware/validate.jwt");

const route = Router();

route.post('/login',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required.').not().isEmpty(),
        validatorFields
    ],
    authController.login
);
/*route.post('/google', [
    check('token', 'The token is required.').not().isEmpty(),
    validatorFields
], authController.loginGoogle);*/
route.get('/renew', validateJwt, authController.renewToken);

module.exports = route;