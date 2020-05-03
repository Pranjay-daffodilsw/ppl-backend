const post_schema = require('../schema/post_schema');

module.exports = function (data) {
    return new Promise(
        (resolve, reject) => {
            let pageDetail = JSON.parse(data.pageDetail);
            let dbQuery = JSON.parse(data.dbQuery);
            console.log(pageDetail, dbQuery);

            post_schema.find({ ...dbQuery._id, ...dbQuery.category }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (Object.keys(dbQuery.max).length === 0) {
                        resolve({
                            data: result.slice(pageDetail.fromElement, pageDetail.uptoElement),
                            totalElements: result.length
                        });
                    }
                    else {
                        if (dbQuery.max === 'like') {
                            let updated_array = [];
                            let maxLike = -1;
                            result.forEach(
                                (item, index) => {
                                    if (item.likes.length > maxLike) {
                                        maxLike = item.likes.length
                                        updated_array = [item]
                                    } else if (item.likes.length === maxLike) {
                                        updated_array.push(item)
                                    }
                                }
                            );
                            resolve({
                                totalElements: updated_array.length,
                                data: updated_array.slice(pageDetail.fromElement, pageDetail.uptoElement)
                            })
                        }
                        else if (dbQuery.max === 'comment') {
                            let updated_array = [];
                            let maxComment = -1;
                            result.forEach(
                                (item, index) => {
                                    if (item.comments.length > maxComment) {
                                        maxComment = item.comments.length
                                        updated_array = [item]
                                    } else if (item.comments.length === maxComment) {
                                        updated_array.push(item)
                                    }
                                }
                            );
                            resolve({
                                totalElements: updated_array.length,
                                data:updated_array.slice(pageDetail.fromElement, pageDetail.uptoElement)
                            });
                        }
                        console.log('post_get_all logic error');
                    }
                }
            }).sort(dbQuery.sort);
        }
    )
}