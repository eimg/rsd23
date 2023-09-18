require("dotenv").config();

const express = require("express");
const router = express.Router();
require("express-ws")(router);

const clients = [];

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

router.ws("/connect", (wss, req) => {
	wss.on("message", token => {
		console.log("Message received");
		jwt.verify(token, secret, (err, user) => {
			if (err) return false;

			if (!clients.find(client => client.uid === user._id)) {
				wss.uid = user._id;
				clients.push(wss);
				console.log("Added a new client");
			}
		});
	});
});

module.exports = { clients, wsRouter: router };
