const cartModel = require("../models/cartModel.js");

module.exports = {
  getCart: async (req, res) => {
    try {
      const userId = req.session.user._id;
      let cartProducts = await cartModel.getCart(userId);
      console.log(cartProducts[0].cartProducts);
      res.render("user/cart", { title: "Cart" });
    } catch (error) {
      console.error("ERROR", error);
    }
  },

  addToCart: async (req, res) => {
    try {
      const productId = req.params.id;
      const userId = req.session.user._id;
      await cartModel.addToCart(userId, productId);
      // console.log("Product added to cart successfully");
      res.redirect("/");
    } catch (error) {
      console.error("Error adding product to cart: " + error);
    }
  },
};
