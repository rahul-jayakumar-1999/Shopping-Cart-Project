var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController.js");

/* GET home page. */
router.get("/", userController.getProduct);

module.exports = router;

