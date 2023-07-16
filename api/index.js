const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// curl -X POST localhost:8888/users -d subject=Milk -v
app.post("/users", (req, res) => {
	const { subject } = req.body;
	if (!subject) return res.status(400).json({ msg: "subject required" });

	return res.status(201).json({ subject });
});

app.get("/users", (req, res) => {
	const data = [
		{ id: 1, name: 'Alice' },
		{ id: 2, name: 'Bob' },
		{ id: 3, name: 'Chris' },
	];

	res.json(data);
});

app.get("/users/:id", (req, res) => {
	const { id } = req.params;
	res.json({ id });
});

app.listen(8888, () => {
	console.log("Api server running at 8888");
});
