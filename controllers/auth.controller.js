const Users = require('../models/users.model');
const encrypted = require('../helpers/password.bcrypt');
const jwtController = require('../helpers/jwt');
//const { googleVerify } = require('../helpers/google-verify');

const authController = {};

authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDb = await Users.findOne({ email });

        if (!userDb) {
            return res.status(404).json({
                OK: false,
                msg: 'Password or email is invalid'
            });
        }

        if (!encrypted.matchPassword(password, userDb.password)) {
            return res.status(404).json({
                OK: false,
                msg: 'Password or email is invalid'
            });
        }
        const token = await jwtController.generateToken(userDb.id);
        return res.status(200).json({
            OK: true,
            msg: `Welcome ${userDb.name}`,
            user: userDb,
            token: token
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            OK: false,
            msg: 'Error server.'
        });
    }
};
/*authController.loginGoogle = async (req, res) => {
    try {
        const { token } = req.body;
        const dataUser = await googleVerify(token);

        const userDb = await Users.findOne({ email: dataUser.email });

        let newUser;

        if (!userDb) {
            newUser = new Users({
                name: dataUser.name,
                email: dataUser.email,
                password: '1234',
                img: dataUser.picture,
                google: true
            });
        } else {
            newUser = userDb;
            newUser.google = true
        }

        await newUser.save();
        const tokenLocal = await jwtController.generateToken(newUser.id);
        return res.status(200).json({
            OK: true,
            msg: `Welcome ${newUser.name}`,
            user: newUser,
            token: tokenLocal
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            OK: false,
            msg: 'Error server.'
        });
    }
};*/
authController.renewToken = async (req, res) => {
    const id = req.id;
    const userToken = await Users.findById(id);
    const token = await jwtController.generateToken(id);
    return res.status(200).json({
        OK: true,
        userToken,
        token
    });
}

module.exports = authController;