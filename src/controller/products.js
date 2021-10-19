const productModel = require('../model/products');

const getProducts = async (req, res) => {

    try {
        const getProd = await productModel.productsGet();

        res.json({
            data : getProd,
            status : "success"
        });
    } catch(err) {
        res.json({
            data : err,
            status : "error"
        });
    }

}

const addProduct = async (req, res) => {
    try {

        const {name, description, price, category} = req.query;

        const addProd = await productModel.productAdd(name, description, price, category);

        res.json({
            data: addProd,
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
    getProducts,
    addProduct
}