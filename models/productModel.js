const { getDB } = require("../config/connection.js");

module.exports = {
  createProduct: function (productData) {
    return new Promise((resolve, reject) => {
      const db = getDB();
      db.collection("ALL_PRODUCTS")
        .insertOne(productData)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
