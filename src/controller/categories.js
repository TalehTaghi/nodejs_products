const categoryModel = require("../model/categories");

const getCategories = async (req, res) => {

    try {
        const getCat = await categoryModel.categoriesGet();

        res.json({
            data : getCat,
            status : "success"
        });
    } catch(err) {
        res.json({
            data : err,
            status : "error"
        });
    }

}

module.exports = {
    getCategories
}