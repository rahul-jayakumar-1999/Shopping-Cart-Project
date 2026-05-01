const { getDB } = require("../config/connection.js");

module.exports = {
  addProduct: function (product, callback) {
    console.log(product);
    let db = getDB();
    db.collection("ALL_PRODUCTS")
      .insertOne(product)
      .then((data) => {
        product._id = data.insertedId;
        callback(product._id);
      });
  },
};
