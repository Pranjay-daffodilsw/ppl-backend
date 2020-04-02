const post_schema = require('../schema/post_schema');

module.exports = function(body, file){
    return new Promise( (resolve, reject) => {
        post_schema.create({
            date: body.date,
            user_id: body.user_id,
            username: body.username,
            title: body.title,
            category: body.category,
            filename: file.filename,
            mimetype: file.mimetype,
            comments: [],
            likes: []
        }, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve({postUploadCompleted: true});
            }
        });
    });
}