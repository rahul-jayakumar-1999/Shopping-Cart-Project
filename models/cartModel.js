const { getDB } = require("../config/connection.js");
const collection = require("../config/collections.js");
const { ObjectId } = require("mongodb");

module.exports = {
  addToCart: async function (userId, productId) {
    const db = getDB();
    const isCartExist = await db
      .collection(collection.CART_COLLECTION)
      .findOne({ userId: new ObjectId(userId) });
    if (isCartExist) {
      return await db
        .collection(collection.CART_COLLECTION)
        .updateOne(
          { userId: new ObjectId(userId) },
          { $push: { products: new ObjectId(productId) } },
        );
    } else {
      const cart = {
        userId: new ObjectId(userId),
        products: [new ObjectId(productId)],
      };
      return await db.collection(collection.CART_COLLECTION).insertOne(cart);
    }
  },

  getCart: async function (userId) {
    const db = getDB();
    return await db
      .collection(collection.CART_COLLECTION)
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) },
        },
        {
          $lookup: {
            from: collection.PRODUCT_COLLECTION,
            let: { productList: "$products" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$productList"],
                  },
                },
              },
            ],
            as: "cartProducts",
          },
        },
      ])
      .toArray();
  },
};
