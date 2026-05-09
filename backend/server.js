const express = require("express");
const cors = require("cors");
const { YoutubeTranscript } = require("youtube-transcript");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/subtitle", async (req, res) => {

  try {

    const { url } = req.body;

    const transcript =
      await YoutubeTranscript.fetchTranscript(url);

    res.json({
      subtitles: transcript
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Cannot get subtitle"
    });

  }

});

app.listen(5000, () => {
  console.log("Backend running 5000");
});
