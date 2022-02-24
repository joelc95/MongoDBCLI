require('dotenv').config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const connection = async () => {
    try {
        await client.connect();
        const db = client.db("Movies");
        return db.collection("Film");
    } catch (error) {
        console.log(error)    }
};

module.exports = { client, connection };
