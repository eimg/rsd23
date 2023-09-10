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
				return res.status(201).json({ token, user });
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

		return res
			.status(201)
			.json({ _id: result.insertedId, name, handle, profile });
	} catch {
		return res.sendStatus(500);
	}
});

app.get("/verify", auth, function (req, res, next) {
	res.json(res.locals.user);
});

app.get("/users/:id/followers", async function (req, res) {
	const { id } = req.params;

	const user = await xusers
		.aggregate([
			{
				$match: { _id: new ObjectId(id) },
			},
			{
				$lookup: {
					localField: "followers",
					from: "users",
					foreignField: "_id",
					as: "follower_users",
				},
			},
		])
		.toArray();

	res.json(user[0]);
});

app.get("/users/:id/following", async function (req, res) {
	const { id } = req.params;

	const user = await xusers
		.aggregate([
			{
				$match: { _id: new ObjectId(id) },
			},
			{
				$lookup: {
					localField: "following",
					from: "users",
					foreignField: "_id",
					as: "following_users",
				},
			},
		])
		.toArray();

	res.json(user[0]);
});

app.get("/users/:handle", async function (req, res) {
	const { handle } = req.params;

	try {
		const user = await xusers.findOne({ handle });
		user.followers = user.followers || [];
		user.following = user.following || [];

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
					$lookup: {
						localField: "_id",
						from: "posts",
						foreignField: "origin",
						as: "comments",
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

		return res.json({ posts: format, user });
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
		return res.sendStatus(500);
	}
});

app.post("/posts", auth, async function (req, res) {
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

app.post("/posts/:origin/comment", auth, async function (req, res) {
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

	const result = await xposts.updateOne({ _id }, { $set: post });

	res.json(result);
});

app.put("/users/:id/follow", auth, async (req, res) => {
	const targetUserId = req.params.id;
	const authUserId = res.locals.user._id;

	const targetUser = await xusers.findOne({
		_id: new ObjectId(targetUserId),
	});

	const authUser = await xusers.findOne({
		_id: new ObjectId(authUserId),
	});

	targetUser.followers = targetUser.followers || [];
	authUser.following = authUser.following || [];

	targetUser.followers.push(new ObjectId(authUserId));
	authUser.following.push(new ObjectId(targetUserId));

	try {
		await xusers.updateOne(
			{ _id: new ObjectId(targetUserId) },
			{
				$set: { followers: targetUser.followers },
			},
		);

		await xusers.updateOne(
			{ _id: new ObjectId(authUserId) },
			{
				$set: { following: authUser.following },
			},
		);

		return res.json({
			followers: targetUser.followers,
			following: authUser.following,
		});
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}
});

app.put("/users/:id/unfollow", auth, async (req, res) => {
	const targetUserId = req.params.id;
	const authUserId = res.locals.user._id;

	const targetUser = await xusers.findOne({
		_id: new ObjectId(targetUserId),
	});

	const authUser = await xusers.findOne({
		_id: new ObjectId(authUserId),
	});

	targetUser.followers = targetUser.followers || [];
	authUser.following = authUser.following || [];

	targetUser.followers = targetUser.followers.filter(
		userId => userId.toString() !== authUserId,
	);

	authUser.following = authUser.following.filter(
		userId => userId.toString() !== targetUserId,
	);

	try {
		await xusers.updateOne(
			{ _id: new ObjectId(targetUserId) },
			{
				$set: { followers: targetUser.followers },
			},
		);

		await xusers.updateOne(
			{ _id: new ObjectId(authUserId) },
			{
				$set: { following: authUser.following },
			},
		);

		return res.json({
			followers: targetUser.followers,
			following: authUser.following,
		});
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}
});

app.get("/notis", auth, async (req, res) => {
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

app.post("/notis", auth, async (req, res) => {
	const user = res.locals.user;
	const { type, target } = req.body;

	let post = await xdb.collection("posts").findOne({
		_id: new ObjectId(target),
	});

	// No noti for unlike
	if (!post.likes.find(item => item.toString() === user._id))
		return res.sendStatus(304);

	// No noti for own posts
	if (user._id === post.owner.toString()) return res.sendStatus(304);

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

	return res.status(201).json(noti);
});

app.put("/notis", auth, (req, res) => {
	const user = res.locals.user;

	xdb.collection("notis").updateMany(
		{ owner: new ObjectId(user._id) },
		{
			$set: { read: true },
		},
	);

	return res.json({ msg: "all notis marked read" });
});

app.put("/notis/:id", auth, async (req, res) => {
	const id = req.params.id;

	xdb.collection("notis").updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: { read: true },
		},
	);

	return res.json({ msg: "noti marked read" });
});

app.listen(8888, () => {
	console.log("X api running at 8888");
});
