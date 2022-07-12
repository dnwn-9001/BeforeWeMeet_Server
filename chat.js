const express = require("express");
const app = express();
const cors = require("cors");
const httpServer = require("http").createServer(app);
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT + 1 : 8082;
const io = require("socket.io")(httpServer);

app.use(cors());

io.on("connection", (socket) => {
  socket.on("send message", (message) => {
    console.log("message:" + message);
    io.emit("receive message", message);
  });
});

httpServer.listen(port, () => {
  console.log("채팅 서버가 돌아가고있습니다.");
});
