const express = require("express");
const app = express();

const server = require("http").createServer(app);

const cors = require("cors");
app.use(express.json());
const mongoose = require('mongoose');
const authRoute = require("./routes/Auth")
const tokenRoute = require("./routes/Token")

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URL || 'mongodb://localhost/IWP-VIDEO';
mongoose
	.connect(DB)
	.then(() => console.log("connection successfull"))
	.catch((err) => console.log(err));

app.get('/', (req, res) => {
	res.send('Running');
});

app.use("/api/auth", authRoute);
app.use("/api/token", tokenRoute);

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
