const DB = require("../db/connection");

const categoriesGet = () => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT * FROM categories`;
        filter = [];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if (result.length === 0 || result == undefined || !result) {
                resolve([]);
                return 0;
            }

            resolve(result);
            return 0;
        });
    })
}

const categoryCheck = (name) => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT * FROM categories where category_name = ?`;
        const filter = [name];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if (result.length === 0 || result == undefined || !result) {
                resolve(0);
                return 0;
            }

            resolve(result);
            return 1;
        });
    });
};


module.exports = {
    categoriesGet,
    categoryCheck
}