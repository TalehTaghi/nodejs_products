const router = require("express").Router();
const productsController = require("../controller/products");
const categoriesController = require("../controller/categories");
const customersController = require("../controller/customers");
const ordersController = require("../controller/orders");

router.get("/all-products", productsController.getProducts);
router.get("/all-categories", categoriesController.getCategories);
router.post("/add-product", ordersController.addOrder);
router.post("/new-product", productsController.addProduct);
router.post("/new-customer", customersController.addCustomer);


module.exports = router;