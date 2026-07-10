const { getDB } = require("../config/connection.js");
const collection = require("../config/collections.js");
const { ObjectId } = require("mongodb");

module.exports = {
  placeOrder: async (orderData, productList, totalPrice) => {
    try {
      const db = getDB();
      const { address, pincode, mobile, userID, paymentType } = orderData;
      let status = paymentType === "COD" ? "Placed" : "Pending";
      let orderDetails = {
        userID: new ObjectId(userID),
        deliveryDetails: {
          address: address,
          pincode: pincode,
          mobile: mobile,
        },
        paymentMethod: paymentType,
        products: productList,
        totalAmount: totalPrice,
        status: status,
        orderDate: new Date()
      };

      return await db
        .collection(collection.ORDER_COLLECTION)
        .insertOne(orderDetails);
    } catch (error) {
      console.error(error);
    }
  },
};
