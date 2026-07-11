const { getDB } = require("../config/connection.js");
const collection = require("../config/collections.js");
const { ObjectId } = require("mongodb");

module.exports = {
  getOrders: async function (userID) {
    const db = getDB();
    return await db
      .collection(collection.ORDER_COLLECTION)
      .find({ userID: new ObjectId(userID) })
      .toArray();
  },

  getOrderProducts: async function (orderID) {
    const db = getDB();
    return await db
      .collection(collection.ORDER_COLLECTION)
      .aggregate([
        {
          $match: { _id: new ObjectId(orderID) },
        },
        {
          $unwind: "$products",
        },
        {
          $project: {
            productId: "$products.productID",
            quantity: "$products.quantity",
          },
        },
        {
          $lookup: {
            from: collection.PRODUCT_COLLECTION,
            localField: "productId",
            foreignField: "_id",
            as: "orderProduct",
          },
        },
        {
          $project: {
            quantity: 1,
            orderProduct: { $arrayElemAt: ["$orderProduct", 0] },
          },
        },
      ])
      .toArray();
  },
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
        orderDate: new Date(),
      };

      return await db
        .collection(collection.ORDER_COLLECTION)
        .insertOne(orderDetails);
    } catch (error) {
      console.error(error);
    }
  },
};
