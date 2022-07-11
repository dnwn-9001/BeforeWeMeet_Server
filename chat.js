const httpServer = require("http").createServer();
const port = process.env.PORT || 8082;
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
}); // cors 오류로 인한 설정.

io.on("connection", (socket) => {
  socket.on("send message", (message) => {
    console.log("message:" + message);
    io.emit("receive message", message);
  });
});

httpServer.listen(port, () => {
  console.log("채팅 서버가 돌아가고있습니다.");
});
