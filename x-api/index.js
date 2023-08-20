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
		const data = await xposts
			.aggregate([
				{
					$match: { type: "post" }
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
					$sort: { created_at: -1 }
				},
				{
					$limit: 20
				}
			])
			.toArray();

		const format = data.map(post => {
			post.user = post.user[0];
			delete post.user.password;

			return post;
		});

		return res.json(format);
	} catch (err) {
		return res.sendStatus(500);
	}
});

app.get("/posts/:id", async function (req, res) {
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
						],
					},
				},
			])
			.toArray();

		const format = data[0];
		format.user = format.user[0];
		delete format.user.password;

		if(format.comments.length) {
			format.comments = format.comments.map(comment => {
				comment.user = comment.user[0];
				return comment;
			})
		}

		return res.json(format);
	} catch (err) {
		return res.sendStatus(500);
	}
});

app.get("/users/:handle", async function (req, res) {
	const { handle } = req.params;

	try {
		const user = await xusers.findOne({ handle });

		const data = await xposts
			.aggregate([
				{
					$match: { owner: user._id }
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
		return res.sendStatus(500);
	}
});

app.listen(8888, () => {
	console.log("X api running at 8888");
});
