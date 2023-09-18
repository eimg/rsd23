require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_URI);

const xdb = mongo.db("x");

const { auth } = require("./auth");
const { clients } = require("./ws");

const notiCount = async owner => {
	try {
		let notis = await xdb
			.collection("notis")
			.aggregate([
				{
					$match: { owner: new ObjectId(owner) },
				},
				{
					$match: { read: false },
				},
				{
					$sort: { _id: -1 },
				},
				{
					$limit: 40,
				},
			])
			.toArray();

		return notis.length;
	} catch (e) {
		return 0;
	}
}

router.get("/notis", auth, async (req, res) => {
	const user = res.locals.user;

	try {
		let notis = await xdb
			.collection("notis")
			.aggregate([
				{
					$match: { owner: new ObjectId(user._id) },
				},
				{
					$sort: { _id: -1 },
				},
				{
					$limit: 40,
				},
				{
					$lookup: {
						from: "users",
						localField: "actor",
						foreignField: "_id",
						as: "user",
					},
				},
			])
			.toArray();

		const format = notis.map(noti => {
			noti.user = noti.user[0];
			delete noti.user.password;

			return noti;
		});

		return res.json(format);
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
});

router.post("/notis", auth, async (req, res) => {
	const user = res.locals.user;
	const { type, target } = req.body;

	let post = await xdb.collection("posts").findOne({
		_id: new ObjectId(target),
	});

	// // No noti for unlike
	// if (post.likes.find(item => item.toString() === user._id))
	// 	return res.sendStatus(304);

	// // No noti for own posts
	// if (user._id === post.owner.toString()) return res.sendStatus(304);

	let result = await xdb.collection("notis").insertOne({
		type,
		actor: new ObjectId(user._id),
		msg: `${type}s your post.`,
		target: new ObjectId(target),
		owner: post.owner,
		read: false,
		created: new Date(),
	});

	let noti = await xdb.collection("notis").findOne({
		_id: result.insertedId,
	});

	clients.map(async client => {
		if (client.uid === post.owner.toString()) {
			console.log(`Broadcast update: ${client.uid}`);

			const count = await notiCount(client.uid);
			client.send(count);
		}
	});

	return res.status(201).json(noti);
});

router.put("/notis", auth, async (req, res) => {
	const user = res.locals.user;

	await xdb.collection("notis").updateMany(
		{ owner: new ObjectId(user._id) },
		{
			$set: { read: true },
		},
	);

	return res.json({ msg: "all notis marked read" });
});

router.put("/notis/:id", auth, async (req, res) => {
	const id = req.params.id;

	xdb.collection("notis").updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: { read: true },
		},
	);

	return res.json({ msg: "noti marked read" });
});

module.exports = { notiRouter: router };
