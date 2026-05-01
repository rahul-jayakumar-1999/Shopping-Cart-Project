const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("SHOPPING_CART_APP");
    console.log("Mongodb connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
