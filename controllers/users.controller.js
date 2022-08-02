const Users = require('../models/users.model');
const passwordEncrypted = require('../helpers/password.bcrypt');
const jwtController = require('../helpers/jwt');

const usersController = { };

usersController.listUser = async (req, res) => {
    try {
        const from = Number(req.query.from) || 0;
        const [ listUser, total ] = await Promise.all([
            Users.find()
                .skip(from)
                .limit(5),
            Users.countDocuments()
        ]);
        res.json({
            ok: true,
            msg: 'List of users.',
            data: listUser,
            totalReg: total
        });
    } catch (err) {
        console.log(err);
    }
}
usersController.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validateEmail = await Users.findOne({ email });
        if (validateEmail) {
            return res.status(400).json({
                OK: false,
                msg: 'The email already registered by a user.'
            });
        }

        const user = new Users(req.body);
        user.password = passwordEncrypted.encryptedPassword(password);
        const token = await jwtController.generateToken(user.id);
        await user.save();
        return res.status(200).json(
            {
                OK: true,
                msg: 'User create successful.',
                token: token,
                user
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            OK: false,
            msg: 'Error server.'
        });
    }
};
usersController.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userDb = await Users.findById(id);
        if (!userDb) {
            return res.status(400).json({
                OK: false,
                msg: 'The ID not exits in the database.'
            });
        }
        const fields = req.body;
        if (userDb.email === req.body.email) {
            delete fields.email
        } else {
            const existEmailUpdate = await Users.findOne({ email: req.body.email });
            if (existEmailUpdate) {
                return res.status(400).json({
                    OK: false,
                    msg: 'The email already registered by a user.'
                });
            }
        }
        delete fields.password;
        delete fields.google;
        if (userDb.google && fields.email !== undefined) {
            delete fields.email;
            return res.status(400).json({
                OK: false,
                msg: "The user of Google can't change his email." ,
            });
        }
        const updateUser = await Users.findByIdAndUpdate(id, fields, { new: true });

        return res.status(200).json({
                OK: true,
                msg: 'User update successful.',
                data: updateUser
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            OK: false,
            msg: 'Error server.'
        });
    }
}
usersController.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userDb = await Users.findById(id);
        if (!userDb) {
            return res.status(400).json({
                OK: false,
                msg: 'The ID not exits in the database.'
            });
        }
        await Users.findByIdAndDelete(id);
        return res.status(200).json({
            OK: true,
            msg: 'User delete successful.'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            OK: false,
            msg: 'Error server.'
        });
    }
}

module.exports = usersController;