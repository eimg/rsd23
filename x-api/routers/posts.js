require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_URI);

const xdb = mongo.db("x");
const xposts = xdb.collection("posts");
const xusers = xdb.collection("users");

const { auth } = require("./auth");

router.get("/posts", auth, async function (req, res) {
	const userId = res.locals.user._id;

	const user = await xusers.findOne({ _id: new ObjectId(userId) });
	user.following = user.following || [];

	try {
		const data = await xposts
			.aggregate([
				{
					$match: { type: "post" },
				},
				// Only show following users' posts
				// {
				// 	$match: {
				// 		owner: { $in: user.following },
				// 	},
				// },
				{
					$lookup: {
						localField: "owner",
						from: "users",
						foreignField: "_id",
						as: "user",
					},
				},
				{
					$lookup: {
						localField: "_id",
						from: "posts",
						foreignField: "origin",
						as: "comments",
					},
				},
				{
					$sort: { created: -1 },
				},
				{
					$limit: 20,
				},
			])
			.toArray();

		const format = data.map(post => {
			post.user = post.user[0];
			delete post.user.password;

			return post;
		});

		return res.json(format);
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
});

router.post("/posts", auth, async function (req, res) {
	const { user } = res.locals;
	const { body } = req.body;

	const post = {
		type: "post",
		body,
		owner: new ObjectId(user._id),
		created: new Date(),
		likes: [],
	};

	const result = await xposts.insertOne(post);
	res.status(201).json({ _id: result.insertedId, ...post });
});

router.post("/posts/:origin/comment", auth, async function (req, res) {
	const { user } = res.locals;
	const { body } = req.body;
	const { origin } = req.params;

	const comment = {
		type: "comment",
		origin: new ObjectId(origin),
		body,
		owner: new ObjectId(user._id),
		created: new Date(),
		likes: [],
	};

	const result = await xposts.insertOne(comment);
	res.status(201).json({ _id: result.insertedId, ...comment });
});

router.get("/posts/:id", async function (req, res) {
	const { id } = req.params;

	try {
		const data = await xposts
			.aggregate([
				{
					$match: { _id: new ObjectId(id) },
				},
				{
					$lookup: {
						localField: "owner",
						from: "users",
						foreignField: "_id",
						as: "user",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "likes",
						foreignField: "_id",
						as: "liked_users",
					},
				},
				{
					$lookup: {
						localField: "_id",
						from: "posts",
						foreignField: "origin",
						as: "comments",
						pipeline: [
							{
								$lookup: {
									from: "users",
									localField: "owner",
									foreignField: "_id",
									as: "user",
								},
							},
							{
								$lookup: {
									localField: "_id",
									from: "posts",
									foreignField: "origin",
									as: "comments",
								},
							},
						],
					},
				},
			])
			.toArray();

		const format = data[0];
		format.user = format.user[0];
		delete format.user.password;

		if (format.comments.length) {
			format.comments = format.comments.map(comment => {
				comment.user = comment.user[0];
				return comment;
			});
		}

		return res.json(format);
	} catch (err) {
		return res.sendStatus(500);
	}
});

router.put("/posts/:id/like", auth, async (req, res) => {
	const _id = new ObjectId(req.params.id);
	const user_id = new ObjectId(res.locals.user._id);

	const post = await xposts.findOne({ _id });

	if (post.likes.find(like => like.toString() === user_id.toString())) {
		post.likes = post.likes.filter(
			like => like.toString() !== user_id.toString(),
		);
	} else {
		post.likes.push(user_id);
	}

	const result = await xposts.updateOne({ _id }, { $set: post });

	res.json(result);
});

module.exports = { postRouter: router };
