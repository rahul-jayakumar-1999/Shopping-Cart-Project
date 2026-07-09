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
      // console.log(isCartExist.products);
      let productExist = isCartExist.products.findIndex((product) => {
        // console.log("1"+product.productID)
        // console.log("2"+productId)
        return product.productID.toString() === productId.toString();
      });

      if (productExist !== -1) {
        return await db.collection(collection.CART_COLLECTION).updateOne(
          {
            userId: new ObjectId(userId),
            "products.productID": new ObjectId(productId),
          },
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
            as: "cartProduct",
          },
        },
        {
          $project: {
            item: 1,
            quantity: 1,
            cartProduct: { $arrayElemAt: ["$cartProduct", 0] },
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

  changeProductQuantity: async function (cartID, productID, count, quantity) {
    const db = getDB();
    count = parseInt(count);
    quantity = parseInt(quantity);
    console.log(cartID, productID, typeof count, quantity);
    if (count === -1 && quantity === 1) {
      await db.collection(collection.CART_COLLECTION).updateOne(
        { _id: new ObjectId(cartID) },
        {
          $pull: {
            products: {
              productID: new ObjectId(productID),
            },
          },
        },
      );

      return { removeProduct: true };
    } else {
      await db.collection(collection.CART_COLLECTION).updateOne(
        {
          _id: new ObjectId(cartID),
          "products.productID": new ObjectId(productID),
        },
        { $inc: { "products.$.quantity": count } },
      );

      return { status: true };
    }
  },

  deleteCartProduct: async function (cartID, productID) {
    const db = getDB();

    await db.collection(collection.CART_COLLECTION).updateOne(
      { _id: new ObjectId(cartID) },
      {
        $pull: {
          products: {
            productID: new ObjectId(productID),
          },
        },
      },
    );

    return { removeProduct: true };
  },

  getTotalAmount: async function (userID) {
    // console.log(`Total Amt userID: ${userID}`);
    const db = getDB();
    let total = await db
      .collection(collection.CART_COLLECTION)
      .aggregate([
        {
          $match: { userId: new ObjectId(userID) },
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
            as: "cartProduct",
          },
        },
        {
          $project: {
            item: 1,
            quantity: 1,
            cartProduct: { $arrayElemAt: ["$cartProduct", 0] },
          },
        },
        {
          $project: {
            total: {
              $sum: {
                $multiply: [
                  { $toDouble: "$cartProduct.price" },
                  { $toInt: "$quantity" },
                ],
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$total" },
          },
        },
      ])
      .toArray();

    return total[0]?.totalAmount || 0;
  },

  getCartProductList: async function (userID) {
    try {
      const db = getDB();
      const cart = await db
        .collection(collection.CART_COLLECTION)
        .findOne({ userId: new ObjectId(userID) });
      return cart.products;
    } catch (error) {
      console.error(error);
    }
  },
};
