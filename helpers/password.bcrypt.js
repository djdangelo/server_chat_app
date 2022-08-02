const bcrypt = require('bcryptjs');

const passwordBcrypt = {};

passwordBcrypt.encryptedPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}
passwordBcrypt.matchPassword = (password, passwordOfDb) => {
    return bcrypt.compareSync(password, passwordOfDb);
}

module.exports = passwordBcrypt;