const orderModel = require("../models/orderModel.js");
const cartModel = require("../models/cartModel.js");

module.exports = {
  getplaceOrderPage: async (req, res) => {
    try {
      const userID = req.session.user._id;
      let total = await cartModel.getTotalAmount(userID);
      console.log("Total Inside gettotal :", total);
      res.render("user/place-order", { title: "PlaceOrder", total});
    } catch (error) {
      console.error(`ERROR: ${error}`);
    }
  },
};
