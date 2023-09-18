require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const { MongoClient } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_URI);

const xdb = mongo.db("x");
const xposts = xdb.collection("posts");
const xusers = xdb.collection("users");

const auth = function (req, res, next) {
	const { authorization } = req.headers;
	const token = authorization && authorization.split(" ")[1];

	if (!token) {
		return res.status(401).json({ msg: "Token required" });
	}

	try {
		let user = jwt.verify(token, secret);
		res.locals.user = user;
		next();
	} catch (err) {
		return res.status(401).json({ msg: err.message });
	}
};

router.post("/login", async function (req, res) {
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

router.get("/verify", auth, function (req, res, next) {
	res.json(res.locals.user);
});

module.exports = { auth, authRouter: router };
