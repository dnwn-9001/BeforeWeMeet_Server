const express = require("express");
const cors = require("cors");
const app = express();
const port = 8081;
const router = require("./routes/index");

// app에 대한 설정
app.use(express.json());
app.use(cors());

// db connect
const maria = require("./database/connect/maria");
maria.connect();

// youtube
app.get("/youtube", async (req, res) => {
  const keyword = req.query.key;
  console.log("key:" + keyword);

  const Youtube = require("youtube-node");
  const youtube = new Youtube();

  let word = keyword;
  let limit = 20;

  youtube.setKey("AIzaSyCilja0kKHgytKakktfm_wHQYOumOW4w50");

  youtube.search(word, limit, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    //console.log(JSON.stringify(result, null, 2));

    let titleList = []; // 제목 담을 배열 변수
    let urlList = []; // url 담을 배열 변수
    let imgList = []; // 썸네일 이미지 담을 배열 변수

    let items = result["items"];
    items.forEach((item) => {
      let title = item["snippet"]["title"];
      let video_id = item["id"]["videoId"];
      let url = "https://www.youtube.com/watch?v=" + video_id;
      let thumbnail_img = item["snippet"]["thumbnails"]["high"];

      titleList.push(title);
      urlList.push(url);
      imgList.push(thumbnail_img);
    });

    let itemList = { titleList, urlList, imgList };
    res.send(itemList);
  });
});

// 내 정보
app.use("/account", router);

app.listen(port, () => {
  console.log("Before We Meet 서버가 돌아가고 있습니다.");
});
