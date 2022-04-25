const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
const { addUser, removeUser, getUser, getRoomUsers } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("message", generateMessage("Admin", "Welcome!"));
    // send message to perticular room
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("Admin", `${user.username} has joined!`)
      );

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", generateMessage(user.username, message));
    callback("Got the message (from server)");
  });

  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback("Location shared");
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left!`)
      );

      // emit room data to all users in a room
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

server.listen(port, () => console.log("App started at port " + port));
