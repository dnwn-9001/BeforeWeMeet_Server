const httpServer = require("http").createServer();
const port = process.env.PORT + 1 || 8082;
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000" || "https://before-we-meet.herokuapp.com",
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
