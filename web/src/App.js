import React, { useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import "./App.css";

export default function App() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const [subtitle, setSubtitle] = useState("Chưa có subtitle");
  const [vi, setVi] = useState("");
  const [en, setEn] = useState("");
  const [zh, setZh] = useState("");

  function getYoutubeId(link) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

    const match = link.match(regExp);

    return match && match[2].length === 11
      ? match[2]
      : null;
  }

  async function loadVideo() {
    const id = getYoutubeId(url);

    if (!id) {
      alert("Link Youtube sai");
      return;
    }

    setVideoId(id);

    try {
      const res = await axios.post(
        "http://localhost:5000/subtitle",
        {
          url: url,
        }
      );

      console.log(res.data);

      setSubtitle(res.data.subtitle || "Không có subtitle");
      setVi(res.data.vi || "");
      setEn(res.data.en || "");
      setZh(res.data.zh || "");
    } catch (err) {
      console.log(err);
      setSubtitle("Lỗi backend");
    }
  }

  return (
    <div className="app">
      <div className="overlay">
        <h1 className="title">Lang Reactor PRO</h1>

        <div className="topbar">
          <input
            type="text"
            placeholder="Paste Youtube URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button onClick={loadVideo}>
            Load
          </button>
        </div>

        <div className="main">
          <div className="video-area">
            {videoId && (
              <YouTube
                videoId={videoId}
                opts={{
                  width: "100%",
                  height: "500",
                  playerVars: {
                    autoplay: 0,
                  },
                }}
              />
            )}

            <div className="subtitle-box">
              <h2>Subtitle</h2>

              <div className="subtitle">
                {subtitle}
              </div>
            </div>
          </div>

          <div className="right-panel">
            <div className="card">
              <h3>VI</h3>
              <p>{vi}</p>
            </div>

            <div className="card">
              <h3>EN</h3>
              <p>{en}</p>
            </div>

            <div className="card">
              <h3>ZH</h3>
              <p>{zh}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
