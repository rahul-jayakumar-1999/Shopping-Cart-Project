var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController.js");
const productController = require("../controllers/productController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const guestMiddleware = require("../middleware/guestMiddleware.js");

/* GET home page. */
router.get("/",authMiddleware, productController.displayProducts);
router.get("/login", guestMiddleware, userController.getUserLogin);
router.get("/signup", guestMiddleware, userController.getUserSignup);
router.get("/logout", userController.userLogout);

router.post("/login", userController.userLogin);
router.post("/signup", userController.userSignUp);

module.exports = router;

