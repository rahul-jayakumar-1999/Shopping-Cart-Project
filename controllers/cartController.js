const cartModel = require("../models/cartModel.js");

module.exports = {
  getCart: async (req, res) => {
    try {
      const userId = req.session.user._id;
      let cartProducts = await cartModel.getCart(userId);
      console.log(cartProducts);
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
      console.log("changeProduct");
      let { cartID, productID, count } = req.body;
      console.log(cartID, productID, count);
      await cartModel.changeProductQuantity(cartID, productID, count);

      const userID = req.session.user._id;

      const cart = await cartModel.getCart(userID);

      console.log(cart);

      const updatedProduct = cart.find(
        (product) => product.cartProduct._id.toString() === productID,
      );

      let quantity = 0;

      if (updatedProduct) {
        quantity = updatedProduct.quantity;
      }

      res.json({ status: true, quantity: quantity });
    } catch (error) {
      console.error("Error adding product to cart: " + error);
    }
  },
  deleteCartProduct: async (req, res) => {
    const { cartID, productID } = req.body;

    await cartModel.deleteCartProduct(cartID, productID);

    res.json({ status: true });
  }
};
