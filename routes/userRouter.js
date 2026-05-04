var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController.js");
const productController = require("../controllers/productController.js");

/* GET home page. */
router.get("/", productController.displayProducts);
router.get("/login", userController.getUserLogin);
router.get("/signup", userController.getUserSignup);

router.post("/login", userController.userLogin)
router.post("/signup", userController.userSignUp);

module.exports = router;

