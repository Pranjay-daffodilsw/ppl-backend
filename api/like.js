const post_schema = require('../schema/post_schema');

module.exports = function (data) {
    if (data.action === 'push') {
        return new Promise(
            (resolve, reject) => {
                console.log(data)
                post_schema.updateOne(
                    {_id: data.post_id},
                    { $push: { likes: data.user_id } },
                    (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.log(result);
                            resolve({ actionCompleted: true })
                        }
                    }
                )
            }
        )

    } else {
        return new Promise(
            (resolve, reject) => {
                post_schema.updateOne(
                    { _id: data.post_id },
                    { $pull: { likes: data.user_id } },
                    (err, result) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve({actionCompleted: true})
                        }
                    }
                )
            }
        )
    }
}