require("dotenv").config();

const express = require("express");
const app = express();
require("express-ws")(app);

const cors = require("cors");
app.use(cors());

const { authRouter } = require("./routers/auth");
app.use(authRouter);

const { userRouter } = require("./routers/users");
app.use(userRouter);

const { postRouter } = require("./routers/posts");
app.use(postRouter);

const { notiRouter } = require("./routers/notis");
app.use(notiRouter);

const { wsRouter } = require("./routers/ws");
app.use(wsRouter);

app.use("/images", express.static(process.env.IMAGES_PATH));

app.listen(8888, () => {
	console.log("X api running at 8888");
});
