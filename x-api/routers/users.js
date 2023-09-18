require("dotenv").config();

const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: process.env.IMAGES_PATH });

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const bcrypt = require("bcrypt");

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_URI);

const xdb = mongo.db("x");
const xposts = xdb.collection("posts");
const xusers = xdb.collection("users");

const { auth } = require("./auth");

router.post("/users", async function (req, res) {
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

router.get("/users/:id/followers", async function (req, res) {
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

router.get("/users/:id/following", async function (req, res) {
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

router.get("/users/:handle", async function (req, res) {
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

router.put("/users/:id/follow", auth, async (req, res) => {
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

router.put("/users/:id/unfollow", auth, async (req, res) => {
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

router.post("/users/:id/photo", upload.single("photo"), async (req, res) => {
	const id = req.params.id;
	const fileName = req.file.filename;

	try {
		await xusers.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: { photo: fileName },
			},
		);
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}

	return res.json({ msg: "Photo updated" });
});

router.post("/users/:id/cover", upload.single("cover"), async (req, res) => {
	const id = req.params.id;
	const fileName = req.file.filename;

	try {
		await xusers.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: { cover: fileName },
			},
		);
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}

	return res.json({ msg: "Cover updated" });
});

router.get("/search/users", async (req, res) => {
	let { q } = req.query;

	try {
		let result = await xusers
			.aggregate([
				{
					$match: {
						name: new RegExp(`.*${q}.*`, "i"),
					},
				},
				{
					$sort: { name: 1 },
				},
				{
					$limit: 5,
				},
			])
			.toArray();

		if (result) {
			return res.json(result);
		}
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}

	return res.status(404).json({ msg: "user not found" });
});

module.exports = { userRouter: router };
