var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController.js");
const productController = require("../controllers/productController.js");
const cartController = require("../controllers/cartController.js");
const orderController = require("../controllers/orderController.js")

const authMiddleware = require("../middleware/authMiddleware.js");
const guestMiddleware = require("../middleware/guestMiddleware.js");

/* GET home page. */
router.get("/", authMiddleware, productController.displayProducts);

router.get("/login", guestMiddleware, userController.getUserLogin);
router.get("/signup", guestMiddleware, userController.getUserSignup);
router.get("/logout", userController.userLogout);

router.get("/cart", authMiddleware, cartController.getCart);
router.get("/add-to-cart/:id", authMiddleware, cartController.addToCart);
router.post(
  "/change-product-quantity",
  authMiddleware,
  cartController.changeProductQuantity,
);
router.post(
  "/delete-cart-product",
  authMiddleware,
  cartController.deleteCartProduct,
);

router.get("/place-order", authMiddleware, orderController.getplaceOrderPage);

router.post("/login", userController.userLogin);
router.post("/signup", userController.userSignUp);

module.exports = router;
