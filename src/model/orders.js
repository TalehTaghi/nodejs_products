const DB = require("../db/connection");
const Products = require("./products");
const Customers = require("./customers");
const moment = require("moment");

const orderAdd = (number, customer_card, product) => {

    return new Promise( async(resolve, reject) => {

        const query = 'INSERT INTO orders (products_number, order_price, order_date, customer_id, product_id) VALUES (?, ?, ?, ?, ?)';

        const check_customer = await Customers.cardCheck(customer_card);
        if (!check_customer) {
            reject("Invalid customer!");
            return 0;
        }

        const check_product = await Products.productCheck(product);
        if (!check_product) {
            reject("Invalid product!");
            return 0;
        }

        const price = check_product[0].product_price * number;
        const date = moment().local().format("YYYY-MM-DD HH:MM:SS");
        const customer_id = check_customer[0].customer_id;
        const product_id = check_product[0].product_id;

        const filter = [number, price, date, customer_id, product_id];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if (result.affectedRows === 0) {
                reject('Order is not added');
                return 0;
            }

            resolve("Order is added");
            return 1;
        });

    })
}


module.exports = {
    orderAdd
}