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
var current_socket;


io.on("connection", (socket) => {
  socket.on("join", ({ username, conversation }) => {
    current_socket = socket;
    UserSocket[username] = socket;
    if (conversation.length) {
      console.log("sockets!!!!!");
      
      conversation.map((conversations) => {
        
        socket.join(conversations._id);
      })
      //console.log(socket);
    }
  });
  // socket("newEvent",({text,chatRoomId})=>{
  //   console.log(text,"socket newEvent");
  //   socket.to(chatRoomId).emit("newMessage",{text});
  // });
});

app.use(function (req,res,next){
  req.socket = current_socket;
  
  next();
});
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/event", require("./routes/messages"));

//io.listen(PORT);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
