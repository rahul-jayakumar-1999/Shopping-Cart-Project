var express = require("express");
const { route } = require("./userRouter");
var router = express.Router();

const productController = require("../controllers/productController.js");
const adminController = require("../controllers/admin.controller.js")

const adminAuth = require("../middleware/admin.auth.middleware.js");

// Admin Router
router.get("/", adminAuth, productController.getProduct);
router.get("/add-product",adminAuth, productController.getAddProduct);
router.get("/delete/:id", adminAuth, productController.deleteProduct);
router.get("/edit/:id", adminAuth, productController.getEditPage);

router.post("/add-product", adminAuth, productController.addProduct);
router.post("/edit-product/:id", adminAuth, productController.updateProduct);

router.get("/login", adminController.login)
router.post("/login", adminController.adminLogin);

router.get("/logout", adminController.adminLogout);

router.get("/search", adminAuth, productController.searchProduct);
module.exports = router;
