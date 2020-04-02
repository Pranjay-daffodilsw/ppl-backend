const post_schema = require('../schema/post_schema');

module.exports = function(data){
    return new Promise(
        (resolve, reject) => {
            let query = {};
            if(data !== null){
                query = data
            }
            post_schema.find(data, (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            }).sort({'date': -1});
        }
    )
}