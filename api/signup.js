const user_auth_schema_model = require('../schema/user_auth_schema_model');

module.exports = function (data) {
    return new Promise((resolve, reject) => {
        user_auth_schema_model.find({ "email": data.email }, (findError, result) => {
            if (findError) {
                resolve({
                    submitSuccess: false,
                    user_already_exist: false,
                    db_error: true
                });
            }
            else if (result.length != 0) {
                resolve({
                    submitSuccess: false,
                    user_already_exist: true,
                    db_error: false
                });
            }
            else {
                user_auth_schema_model.create(data, (err, result) => {
                    if (err) {
                        resolve({
                            submitSuccess: false,
                            user_already_exist: false,
                            db_error: true
                        });
                    }
                    else {
                        resolve({
                            submitSuccess: true,
                            user_already_exist: false,
                            db_error: false
                        });
                    }
                })
            }
        })
    })
}