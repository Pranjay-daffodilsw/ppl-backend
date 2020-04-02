const user_auth_schema_model = require('../schema/user_auth_schema_model');

module.exports = function (data) {
    return new Promise((resolve, reject) => {
        user_auth_schema_model.find({ 'email': data.email }, (err, result) => {
            if (result.length != 0) {
                if (result[0].password === data.password) {
                    resolve({
                        loginSuccess: true,
                        emailMatch: true,
                        passwordMatch: true,
                        userInfo: {
                            username: result[0].username,
                            email: result[0].email,
                            fname: result[0].fname,
                            lname: result[0].lname,
                            user_id: result[0]._id
                        }
                    })
                }
                else {
                    resolve({
                        loginSuccess: false,
                        emailMatch: true,
                        passwordMatch: false
                    })
                }
            }
            else {
                resolve({
                    loginSuccess: false,
                    emailMatch: false,
                    passwordMatch: false
                })
            }

        })
    })
}