const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "horse battery staple";

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");

const xdb = mongo.db("x");
const xposts = xdb.collection("posts");
const xusers = xdb.collection("users");

const auth = function (req, res, next) {
	const { authorization } = req.headers;
	const token = authorization && authorization.split(" ")[1];

	if (!token) {
		return res.status(401).json({ msg: "Token required" });
	}

	jwt.verify(token, secret, function (err, user) {
		if (err) {
			return res.status(401).json({ msg: "Invalid token" });
		}

		res.locals.user = user;
		next();
	});
};

app.post("/login", async function (req, res) {
	const { handle, password } = req.body;
	if (!handle || !password) {
		return res.status(400).json({ msg: "required: handle and password" });
	}

	try {
		const user = await xusers.findOne({ handle });

		if (user) {
			const result = await bcrypt.compare(password, user.password);

			if (result) {
				const token = jwt.sign(user, secret);
				return res.json({ token, user });
			}
		}

		return res.status(403).json({ msg: "Incorrect handle or password" });
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}
});

app.post("/users", async function (req, res) {
	const { name, handle, profile, password } = req.body;
	if (!name || !handle || !password) {
		return res
			.status(400)
			.json({ msg: "required: name, handle and password" });
	}

	let hash = await bcrypt.hash(password, 10);

	try {
		const result = await xusers.insertOne({
			name,
			handle,
			profile,
			password: hash,
		});

		return res.json({ _id: result.insertedId, name, handle, profile });
	} catch {
		return res.sendStatus(500);
	}
});

app.get("/verify", auth, function (req, res, next) {
	res.json(res.locals.user);
});

app.get("/users/:handle", async function (req, res) {
	const { handle } = req.params;

	try {
		const user = await xusers.findOne({ handle });

		const data = await xposts
			.aggregate([
				{
					$match: { owner: user._id },
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

app.get("/posts", auth, async function (req, res) {
	try {
		const data = await xposts
			.aggregate([
				{
					$match: { type: "post" },
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
					$sort: { created_at: -1 },
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

app.put("/posts/:id/like", auth, async (req, res) => {
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

	const result = await xposts.updateOne(
		{ _id },
		{ $set: post },
	);

	res.json(result);
});

app.listen(8888, () => {
	console.log("X api running at 8888");
});
