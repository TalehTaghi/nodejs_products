const DB = require("../db/connection");

const customerAdd = (name, email, card) => {

    return new Promise( async(resolve, reject) => {

        const query = `INSERT INTO customers (customer_name, customer_email, customer_card) VALUES (?, ?, ?)`;

        email = email.toLowerCase();
        const check_mail = await mailCheck(email);
        if (check_mail) {
            reject("This email has already been used!");
            return 0;
        }

        const check_card = await cardCheck(card);
        if (check_card) {
            reject("This card number has already been used!");
            return 0;
        }

        const filter = [name, email, card];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if (result.affectedRows === 0) {
                reject('Customer is not added');
                return 0;
            }

            resolve("Customer is added");
            return 1;
        });
    });

};

const mailCheck = (email) => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT * FROM customers WHERE customer_email = ?`;
        const filter = [email];

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

const cardCheck = (card) => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT * FROM customers WHERE customer_card = ?`;
        const filter = [card];

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
    customerAdd,
    cardCheck
}