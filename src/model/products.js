const DB = require("../db/connection");
const Categories = require("./categories");

const productsGet = () => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT product_id, product_name, product_description, category_name FROM products, categories WHERE products.category_id = categories.category_id`;
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

const productAdd = (name, description, price, category) => {

    return new Promise( async(resolve, reject) => {

        const query = `INSERT INTO products (product_name, product_description, product_price, category_id) VALUES (?, ?, ?, ?)`;

        const check_category = await Categories.categoryCheck(category);
        if (!check_category) {
            reject("No such category!");
            return 0;
        }

        const check_product = await productCheck(name);
        if (check_product) {
            reject("This product is already added!");
            return 0;
        }

        const filter = [name, description, price, check_category[0].category_id];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if (result.affectedRows === 0) {
                reject('Product is not added');
                return 0;
            }

            resolve("Product is added");
            return 1;
        });
    });

};

const productCheck = (name) => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT * FROM products WHERE product_name = ?`;
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
    productsGet,
    productAdd,
    productCheck
}