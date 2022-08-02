const {validationResult} = require("express-validator");

const validatorFields = (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()){
        return res.status(400).json({
            OK: false,
            errors: errs.mapped()
        });
    }
    next();
}
module.exports = validatorFields;