const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");
const UserSocket = require("./UserSocket.json");
const app = express();
dotenv.config();
// const socketio=require('socket.io')

// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("working");
});
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);
// io.on("connection", (socket) => {
//   // console.log(socket.id);
//   console.log("a user connected");
//   // socket.join("room1");
//   // console.log(socket.rooms);
//   socket.on("join", (arg) => {
//     console.log(arg);
//   });
// });
io.on("connection", (socket) => {
  socket.on("join", ({ username, conversation }) => {
    UserSocket[username] = socket;
    if (conversation.length) {
      console.log("sockets!!!!!");
      
      conversation.map((conversations) => {
        // console.log(conversations._id)
        // console.log("one element");
        socket.join(conversations._id);
      })
      console.log(socket);
    }
  });
});
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/event", require("./routes/messages"));

//io.listen(PORT);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
