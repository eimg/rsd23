const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");

const xdb = mongo.db("x");
const xposts = xdb.collection("posts");
const xusers = xdb.collection("users");

app.get("/posts", async function (req, res) {
	try {
		const data = await xposts.find().limit(20).toArray();
		return res.json(data);
	} catch (err) {
		return res.sendStatus(500);
	}
});

app.listen(8888, () => {
	console.log("X api running at 8888");
});
