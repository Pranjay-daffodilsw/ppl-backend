const post_schema = require('../schema/post_schema');

module.exports = function(data){
    return new Promise(
        (resolve, reject) => {
            let query = {}, pageSize, pageStart;
            // console.log(data);
            if(data !== null){
                query = data.dbQuery;
                fromElement = Number(data.fromElement);
                uptoElement = Number(data.uptoElement);
            }
            post_schema.find(query, (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    if(data){
                        
                        resolve({
                            totalElements: result.length,
                            data: result.slice(fromElement, uptoElement +1)
                        });
                        
                    }
                    else{
                        resolve(result);
                    }
                }
            }).sort({'date': -1});
        }
    )
}