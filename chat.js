const fs = require("fs");
const express = require("express");
const app = express();
const httpServer =
  process.env.NODE_ENV === "production"
    ? require("https").createServer({
        key: fs.readFileSync("/tmp/key.pem"),
        cert: fs.readFileSync("/tmp/cert.pem"),
      })
    : require("http").createServer(app);
const port = process.env.PORT + 1 || "80";

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join", () => {
    io.emit("onConnect", `상담을 위한 채팅창입니다.`);
  });

  socket.on("onSend", (messageItem) => {
    io.emit("onReceive", messageItem);
  });

  socket.on("disconnect", () => {
    io.emit("onDisconnect", `퇴장하셨습니다.`);
  });
});

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
