const customerModel = require("../model/customers");

const addCustomer = async (req, res) => {
    try {

        const {name, email, card} = req.query;

        const addCust = await customerModel.customerAdd(name, email, card);

        res.json({
            data: addCust,
            status: "success",
        })
    } catch (err) {
        res.json({
            data: err,
            status: "error"
        });
    }
};

module.exports = {
    addCustomer
}