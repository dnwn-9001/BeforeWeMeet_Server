const express = require("express");
const app = express();
const fs = require("fs");
const httpServer = require("http").createServer(app);
const port = normalizePort(process.env.PORT || "80");

app.get("/", (req, res) => {
  res.send("chat!!");
});

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send message", (message) => {
    console.log("message:" + message);
    io.emit("receive message", message);
  });
});

httpServer.listen(port, () => {
  console.log("채팅 서버가 돌아가고있습니다.");
});
