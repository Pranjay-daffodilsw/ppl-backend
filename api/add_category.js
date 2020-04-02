const category_schema = require('../schema/category_schema');

module.exports = function(data){
    return new Promise(
        (resolve, reject) => {
            category_schema.create({
                categoryname: data.categoryname,
                thumbnail: data.thumbnail
            }, (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve({add_category_success: true});
                }
            } 
            )
        }
    )
}