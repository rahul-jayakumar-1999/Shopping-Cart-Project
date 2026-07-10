const orderModel = require("../models/orderModel.js");
const cartModel = require("../models/cartModel.js");

module.exports = {
  getOrderSuccess: (req, res) => {
    res.render("user/order-success");
  },

  getplaceOrderPage: async (req, res) => {
    try {
      const userID = req.session.user._id;
      let total = await cartModel.getTotalAmount(userID);
      console.log("Total Inside gettotal :", total);
      res.render("user/place-order", { title: "PlaceOrder", total });
    } catch (error) {
      console.error(`ERROR: ${error}`);
    }
  },

  addOrderDetails: async (req, res) => {
    try {
      const userId = req.session.user._id;
      let cartProducts = await cartModel.getCartProductList(userId);
      let totalAmount = await cartModel.getTotalAmount(userId);
      let order = await orderModel.placeOrder(
        req.body,
        cartProducts,
        totalAmount,
      );
      // console.log(order);
      await cartModel.removeCart(userId);
      res.json({
        success: true,
        order,
      });
    } catch (error) {
      res.json({
        success: false,
      });
    }
  },
};
