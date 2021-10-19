const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    dateStrings: true,
    database: "sport_shop"
})

connection.connect(error => {
    if (error) throw error;
    console.log("Success DB Connection");
});

module.exports = connection;