const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const port = normalizePort(process.env.PORT || "80");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  if (err) throw err;
  res.send(console.log("성공"));
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
