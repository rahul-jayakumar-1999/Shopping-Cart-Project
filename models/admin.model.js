const { getDB } = require("../config/connection.js");
const collection = require("../config/collections.js");
const { ObjectId } = require("mongodb");

module.exports = {
  findAdminByEmail: async (email) => {
    const db = getDB();
    return await db.collection(collection.ADMIN_COLLECTION).findOne({email});
  },
};
