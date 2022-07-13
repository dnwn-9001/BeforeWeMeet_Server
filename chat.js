const httpServer =
  process.env.NODE_ENV === "production"
    ? require("https").createServer({
        key: fs.readFileSync("/tmp/key.pem"),
        cert: fs.readFileSync("/tmp/cert.pem"),
      })
    : require("http").createServer();
const port = process.env.NODE_ENV === "production" ? 443 : 8082;
const io = require("socket.io")(httpServer, {
  cors: {
    origin:
      "http://localhost:3000" ||
      "http://localhost:3001" ||
      "http://localhost:3002" ||
      "http://localhost:3003" ||
      "https://before-we-meet.herokuapp.com" ||
      "https://before-we-meet-gqek60mgo-dnwn-9001.vercel.app/" ||
      "https://before-we-meet-grtaa4xgh-dnwn-9001.vercel.app/",
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
