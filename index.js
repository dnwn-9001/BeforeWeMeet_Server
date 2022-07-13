const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8081;
const router = require("./routes/index");
const joinRouter = require("./routes/join");

app.use(express.json());
app.use(cors());

// db connect
const maria = require("./database/connect/maria");
maria.connect();

// experts
app.get("/experts", async (req, res) => {
  res.send({
    experts: [
      {
        imgUrl: "images/kang.png",
        name: "강형욱",
        job: "동물훈련사",
      },
      {
        imgUrl: "images/kim.png",
        name: "김명철",
        job: "수의사, 고양이 행동 전문가",
      },
      {
        imgUrl: "images/jung.png",
        name: "김정호",
        job: "수의사",
      },
      {
        imgUrl: "images/kwon.png",
        name: "권혁필",
        job: "에듀펫 소장",
      },
      {
        imgUrl: "images/Lee.png",
        name: "이찬종",
        job: "동물훈련사",
      },
      {
        imgUrl: "images/Jun.png",
        name: "이준규",
        job: "반려견 훈련사",
      },
    ],
  });
});

// youtube api
app.get("/youtube", async (req, res) => {
  const keyword = req.query.key;
  console.log("key:" + keyword);

  const Youtube = require("youtube-node");
  const youtube = new Youtube();

  const word = keyword;
  const limit = 20;

  youtube.setKey(process.env.API_KEY);

  youtube.search(word, limit, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    let imgList = [];
    const items = result["items"];

    items.forEach((item) => {
      const thumbnail_img = item["snippet"]["thumbnails"]["high"];

      imgList.push(thumbnail_img);
    });

    const itemList = { imgList };
    res.send(itemList);
  });
});

// 내 정보
app.use("/account", router);
// 회원가입
app.post("/join", (req, res) => {
  console.log("post 메소드");
  app.use("/", joinRouter);
});

app.listen(port, () => {
  console.log("Before We Meet 서버가 돌아가고 있습니다.");
});
