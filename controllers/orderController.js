const orderModel = require("../models/orderModel.js");
const cartModel = require("../models/cartModel.js");
const stripe = require("../config/stripe.js");

module.exports = {
  getOrderPage: async (req, res) => {
    try {
      const userID = req.session.user._id;
      let orders = await orderModel.getOrders(userID);
      for (let order of orders) {
        order.products = await orderModel.getOrderProducts(order._id);
      }
      res.render("user/orders", { title: "Orders", orders });
    } catch (error) {
      console.error(error);
    }
  },

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
      const paymentMethod = req.body.paymentMethod;
      let cartProducts = await cartModel.getCartProductList(userId);
      let totalAmount = await cartModel.getTotalAmount(userId);
      let status = paymentMethod === "COD" ? "Placed" : "Pending";
      let order = await orderModel.placeOrder(
        req.body,
        cartProducts,
        totalAmount,
        status,
      );

      let orderID = order.insertedId.toString();

      if (paymentMethod === "COD") {
        await cartModel.removeCart(userId);
        res.json({
          success: true,
          paymentMethod: "COD",
          orderID,
        });
      } else {
        await cartModel.removeCart(userId);
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],

          line_items: [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: `Order #${orderID}`,
                },
                unit_amount: totalAmount * 100, // ₹500
              },
              quantity: 1,
            },
          ],

          mode: "payment",

          metadata: {
            orderID,
            userId: userId.toString(),
          },

          success_url:
            "http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}",

          cancel_url: "http://localhost:3000/payment-cancel",
        });

        return res.json({
          success: true,
          paymentMethod: "ONLINE",
          orderID,
          url: session.url,
        });
      }

      // res.redirect(303, session.url);
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
      });
    }
  },
};
