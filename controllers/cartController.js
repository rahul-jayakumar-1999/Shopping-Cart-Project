// const { response } = require("express");
const cartModel = require("../models/cartModel.js");

module.exports = {
  getCart: async (req, res) => {
    try {
      const userId = req.session.user._id;
      let cartProducts = await cartModel.getCart(userId);
      let total = await cartModel.getTotalAmount(userId);
      // console.log(cartProducts);
      res.render("user/cart", { title: "Cart", cartProducts, total });
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
      // console.log("PRODUCTS:", cart.products);
      const cartCount = await cartModel.cartCount(userId);
      console.log("add to cart ", cartCount);
      res.json({ status: true, cartCount: cartCount });
    } catch (error) {
      console.error("Error adding product to cart: " + error);
    }
  },

  changeProductQuantity: async (req, res) => {
    try {
      // console.log(req.body);
      const userID = req.session.user._id;
      // console.log("hello"+userID);
      let { cartID, productID, count, quantity } = req.body;
      // console.log("change product quantity", userID);
      let response = await cartModel.changeProductQuantity(
        cartID,
        productID,
        count,
        quantity,
      );

      response.total = await cartModel.getTotalAmount(userID);
      // console.log("hello" + response.total);
      res.json(response);
    } catch (error) {
      console.error("Error adding product to cart: " + error);
    }
  },
  deleteCartProduct: async (req, res) => {
    const { cartID, productID } = req.body;

    let response = await cartModel.deleteCartProduct(cartID, productID);

    res.json(response);
  },

  
};
