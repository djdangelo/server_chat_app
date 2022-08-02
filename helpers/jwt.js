const jwt = require('jsonwebtoken');

const jwtController = {};

jwtController.generateToken = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id
        };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error in generate token of user');
            } else {
                resolve(token);
            }
        })
    });
}
jwtController.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = jwtController;