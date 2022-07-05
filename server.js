const express = require("express");
const cors = require("cors");
const app = express();
const port = 8081;

// app에 대한 설정
app.use(express.json());
app.use(cors());

app.get("/youtube", async (req, res) => {
  const Youtube = require("youtube-node");
  const youtube = new Youtube();

  let word = "반려동물 준비물";
  let limit = 10;

  youtube.setKey("AIzaSyCilja0kKHgytKakktfm_wHQYOumOW4w50");

  //검색 옵션 지정 (invalid 로 오류남)
  //   youtube.addParam("eventType", "completed ");
  //   youtube.addParam("order", "rating  ");
  youtube.search(word, limit, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(JSON.stringify(result, null, 2));

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

    // 객체에 각 배열들 담기.
    let itemList = { titleList, urlList, imgList };
    res.send(itemList);
  });
});

app.listen(port, () => {
  console.log("Before We Meet 서버가 돌아가고 있습니다.");
});
