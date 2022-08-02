const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(
            'Db connection successful'
        )
    } catch (err) {
        console.log(err);
        throw new Error('Error connection of database');
    }
}

module.exports = {
    dbConnection
}