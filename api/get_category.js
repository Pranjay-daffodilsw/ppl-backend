const category_schema = require('../schema/category_schema');

module.exports = function(){
    return new Promise(
        (resolve, reject) => {
            category_schema.find({}, (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            }).sort({'categoryname': 1});
        }
    )
}