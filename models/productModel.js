const { getDB } = require("../config/connection.js");
const collection = require("../config/collections.js");
const { ObjectId } = require("mongodb");

module.exports = {
  getProduct: function () {
    return new Promise((resolve, reject) => {
      const db = getDB();
      db.collection(collection.PRODUCT_COLLECTION)
        .find()
        .toArray()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createProduct: function (productData) {
    return new Promise((resolve, reject) => {
      const db = getDB();
      db.collection(collection.PRODUCT_COLLECTION)
        .insertOne(productData)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateImage: function (id, fileName) {
    return new Promise((resolve, reject) => {
      const db = getDB();
      db.collection(collection.PRODUCT_COLLECTION)
        .updateOne({ _id: new ObjectId(id) }, { $set: { image: fileName } })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteProduct: async function (productId) {
    const db = getDB();
    return await db.collection(collection.PRODUCT_COLLECTION).deleteOne({
      _id: new ObjectId(productId),
    });
  },
};
