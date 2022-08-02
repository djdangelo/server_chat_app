const { Router } = require('express');
const userController = require('../controllers/users.controller')
const { check } = require('express-validator');
const validatorFields = require('../middleware/validator.fields');
const validateJwt = require('../middleware/validate.jwt');

const router = Router();

router.get('/', validateJwt, userController.listUser);
router.post('/', [
    check('name', 'The name is required.').not().isEmpty(),
    check('email', 'The email is required.').isEmail(),
    check('password', 'The password is required.').not().isEmpty(),
    validatorFields
], userController.createUser);
router.put('/:id', [
    validateJwt,
    check('name', 'The name is required.').not().isEmpty(),
    check('email', 'The email is required.').not().isEmpty(),
    check('role', 'The role is required').not().isEmpty()
], userController.updateUser);
router.delete('/:id', validateJwt, userController.deleteUser);

module.exports = router;