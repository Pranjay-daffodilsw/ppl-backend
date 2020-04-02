const post_schema = require('../schema/post_schema');

module.exports = function(data){
    return new Promise(
        (resolve, reject) => {
            post_schema.updateOne({_id: data.post_id}, {$push: {comments: data}}, 
                    (err, result) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve({add_post_success: true
                            });
                            console.log(result);
                        }
                    }
                )
        }
    )
}