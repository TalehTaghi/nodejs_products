const orderModel = require("../model/orders");

const addOrder = async (req, res) => {
    try {

        const {number, customer_card, product} = req.query;

        const addOrd = await orderModel.orderAdd(number, customer_card, product);

        res.json({
            data: addOrd,
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
    addOrder
}