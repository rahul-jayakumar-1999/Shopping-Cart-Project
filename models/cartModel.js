const { getDB } = require("../config/connection.js");
const collection = require("../config/collections.js");
const { ObjectId } = require("mongodb");

module.exports = {
  addToCart: async function (userId, productId) {
    const db = getDB();
    const productData = {
      productID: new ObjectId(productId),
      quantity: 1,
    };
    const isCartExist = await db
      .collection(collection.CART_COLLECTION)
      .findOne({ userId: new ObjectId(userId) });
    if (isCartExist) {
      console.log(isCartExist.products);
      let productExist = isCartExist.products.findIndex((product) => {
        // console.log("1"+product.productID)
        // console.log("2"+productId)
        return product.productID.toString() === productId.toString();
      });

      if (productExist !== -1) {
        return await db
          .collection(collection.CART_COLLECTION)
          .updateOne(
            { "products.productID": new ObjectId(productId) },
            { $inc: { "products.$.quantity": 1 } },
          );
      } else {
        return await db
          .collection(collection.CART_COLLECTION)
          .updateOne(
            { userId: new ObjectId(userId) },
            { $push: { products: productData } },
          );
      }
    } else {
      const cart = {
        userId: new ObjectId(userId),
        products: [productData],
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

  cartCount: async function (userId) {
    let count = 0;
    const db = getDB();
    const isCartExist = await db
      .collection(collection.CART_COLLECTION)
      .findOne({ userId: new ObjectId(userId) });

    if (isCartExist) {
      count = isCartExist.products.length;
      return count;
    } else {
      return count;
    }
  },
};
