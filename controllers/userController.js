const productModel = require("../models/productModel.js");

module.exports = {
  getProduct: (req, res) => {
    productModel
      .getProduct()
      .then((products) => {
        res.render("user/view-products", { title: "Shopping Cart", products, admin: false });
      })
      .catch((err) => {
        console.error("ERROR: " + err);
      });
  },
};
