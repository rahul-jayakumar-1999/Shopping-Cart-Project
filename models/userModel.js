const { getDB } = require("../config/connection.js");
const collection = require("../config/collections.js");
const { ObjectId } = require("mongodb");

module.exports = {
  createUser: function (userData) {
    return new Promise((resolve, reject) => {
      const db = getDB();
      db.collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  findByEmail: function(email) {
    return new Promise((resolve, reject) => {
      const db = getDB();
      db.collection(collection.USER_COLLECTION)
        .findOne({email})
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
