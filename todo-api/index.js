const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");
const db = mongo.db("todo");

app.get("/tasks", async function (req, res) {
	try {
		const data = await db.collection("tasks").find().toArray();

		setTimeout(() => {
			res.json(data);
		}, 3000);
	} catch (err) {
		res.status(500).json({msg: 'Something went wrong'});
	}
});

app.post("/tasks", async function (req, res) {
	const { subject } = req.body;
	if (!subject) return res.status(400).json({ msg: "subject required" });

	const data = { subject, done: false };
	const result = await db.collection("tasks").insertOne(data);

	res.json({ _id: result.insertedId, ...data });
});

app.put("/tasks/:id/toggle", async function (req, res) {
	const { id } = req.params;

	const result = await db
		.collection("tasks")
		.updateOne({ _id: new ObjectId(id) }, [
			{
				$set: { done: { $not: "$done" } },
			},
		]);

	res.json(result);
});

app.delete("/tasks/:id", async function (req, res) {
	const { id } = req.params;
	const result = await db
		.collection("tasks")
		.deleteOne({ _id: new ObjectId(id) });

	res.json(result);
});

app.delete("/tasks", async function (req, res) {
	const result = await db.collection("tasks").deleteMany({ done: true });

	res.json(result);
});

app.listen(8888, () => {
	console.log("Api running at 8888");
});
