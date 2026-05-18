const cartModel = require("../models/cartModel.js");

module.exports = {
  getCart: async (req, res) => {
    try {
      const userId = req.session.user._id;
      let cartProducts = await cartModel.getCart(userId);
      // console.log(cartProducts[0].cartProduct);
      res.render("user/cart", { title: "Cart", cartProducts });
    } catch (error) {
      console.error("ERROR", error);
    }
  },

  addToCart: async (req, res) => {
    try {
      const productId = req.params.id;
      const userId = req.session.user._id;
      await cartModel.addToCart(userId, productId);
      const cart = await cartModel.getCart(userId);
      // console.log(cart);
      // console.log("PRODUCTS:", cart.products);
      const cartCount = cart[0].products.length;
      res.json({ status: true, cartCount: cartCount });
    } catch (error) {
      console.error("Error adding product to cart: " + error);
    }
  },
};
