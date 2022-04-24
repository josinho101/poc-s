const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New connection");

  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "A new user joined!!");

  socket.on("sendMessage", (message, callback) => {
    io.emit("message", message);
    callback("Got the message (from server)");
    console.log(message);
  });

  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "locationMessage",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    callback("Location shared");
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left!!");
  });
});

server.listen(port, () => console.log("App started at port " + port));
