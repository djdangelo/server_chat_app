const User = require('../models/users.model');
const fs = require('fs');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');

const deleteImage = (path) => {
    if (fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

const updateImage = async ( type, id, nameFile ) => {
    switch ( type ) {
        case 'doctor':
            const doctor = await Doctor.findById(id);
            if (!doctor){
                return false;
            }
            const pathActual = `./upload/doctor/${doctor.img}`;
            deleteImage(pathActual);
            doctor.img = nameFile;
            await doctor.save();
            return true;
        case 'hospital':
            const hospital = await Hospital.findById(id);
            if (!hospital){
                return false;
            }
            const pathActualHospital = `./upload/hospital/${hospital.img}`;
            deleteImage(pathActualHospital);
            hospital.img = nameFile;
            await hospital.save();
            return true;
        case 'user':
            const user = await User.findById(id);
            if (!user){
                return false;
            }
            const pathActualUser = `./upload/user/${user.img}`;
            deleteImage(pathActualUser);
            user.img = nameFile;
            await user.save();
            return true;
        default:
            return false;
    }
}

module.exports = {
    updateImage
};