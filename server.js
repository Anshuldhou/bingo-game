const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public")); // To serve static files like your HTML, CSS, JS

io.on("connection", (socket) => {
  console.log("A player connected");

  socket.on("disconnect", () => {
    console.log("A player disconnected");
  });

  // Example of emitting a Bingo number to both players
  socket.emit("newNumber", { number: Math.floor(Math.random() * 25) + 1 });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
