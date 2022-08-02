const jwtController = require('../helpers/jwt');
const validateJwt = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            OK: false,
            msg: 'Token is required for this route.'
        });
    }
    try {
        const { id } = jwtController.verifyToken(token);
        req.id = id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            OK: false,
            msg: 'Token is invalid.'
        });
    }
}
module.exports = validateJwt;