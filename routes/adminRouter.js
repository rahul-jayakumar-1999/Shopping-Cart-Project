var express = require("express");
const { route } = require("./userRouter");
var router = express.Router();

const productController = require("../controllers/productController.js");

// Admin Router
router.get("/", productController.getProduct);
router.get("/add-product", productController.getAddProduct);
router.get("/delete/:id", productController.deleteProduct);

router.post("/add-product", productController.addProduct);
module.exports = router;
