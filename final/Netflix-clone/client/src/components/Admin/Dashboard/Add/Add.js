import React, { useState } from "react";
import Axios from "axios";
import { StatusAlertService } from "react-status-alert";

import "./Add.css";

export default function Add() {
  const [screenShotList, setscreenShotList] = useState([]);
  const [screenshot, setscreenshot] = useState("");

  const [downloadLinkList, setdownloadLinkList] = useState([]);
  const [downloadLink, setdownloadLink] = useState("");
  const [quality, setquality] = useState("480p");


  const [name, setname] = useState("");
  const [year, setyear] = useState("");

  const [language, setlanguage] = useState("Hindi");
  const [wood, setwood] = useState("Bollywood");

  const [thumblainImg, setthumblainImg] = useState("");
  const [trailerVideoId, settrailerVideoId] = useState("");

  const [movieQuality, setmovieQuality] = useState("");
  const [onlineWatchingUrl, setonlineWatchingUrl] = useState("");

  const addToList = (type) => {
    if (type === "screen-shot") {
      screenShotList.push(screenshot);
      setscreenshot("");
    } else if (type === "download-link") {
      downloadLinkList.push({
        Quality: quality,
        Url: downloadLink,
      });

      setdownloadLink("");
    }
  };

 

  const submitData = async () => {
    if (
      name &&
      year &&
      language &&
      wood &&
      thumblainImg &&
      trailerVideoId &&
      movieQuality &&
      onlineWatchingUrl &&
      screenShotList.length > 0 &&
      downloadLinkList.length > 0
    ) {
      const secret = localStorage.getItem("Site_New_Tokken");
      const trailerUrl = `https://www.youtube.com/embed/${trailerVideoId}`;

      const timestamp = await Date.now();

      const res = await Axios.post("/movie_data/add", {
        secret,
        name,
        year,
        language,
        wood,
        thumblainImg,
        trailerUrl,
        movieQuality,
        onlineWatchingUrl,
        screenShotList,
        downloadLinkList,
        timestamp,
      });

      console.log(res);

      if (res.data.msg) {
        await StatusAlertService.showError("Something Want Wrong");
        console.log(res.data);
      } else {
        await StatusAlertService.showSuccess("Successfully Added");
        var time = setTimeout(() => {
          window.location.reload();
          clearTimeout(time);
        }, 2000);
      }
    } else {
      await StatusAlertService.showError("Please Enter All Data");
    }
  };

  return (
    <div className="mt-5 container text-center">
      <h1 className="mb-4">Add</h1>
      <hr className="bg-light mb-5" />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <h4>Name</h4>

          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Movie Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />

          <h4 className="mt-5">Year</h4>
          <input
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Year"
            value={year}
            onChange={(e) => setyear(e.target.value)}
          />
        </div>
        <div className="form-group d-flex mt-5">
          <select
            value={language}
            onChange={(e) => setlanguage(e.target.value)}
            className="browser-default custom-select mr-1"
          >
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Hindi/English">Hindi & English</option>
          </select>

          <select
            value={wood}
            onChange={(e) => setwood(e.target.value)}
            className="browser-default custom-select"
          >
            <option value="Bollywood">Bollywood</option>
            <option value="Hollywood">Hollywood</option>
            <option value="Series">Series</option>
          </select>
        </div>

        <div className="form-group">
          <h4 className="mt-5">Thumbnail</h4>
          <input
            className="form-control mr-1"
            aria-describedby="emailHelp"
            placeholder="Enter Url Of Thumblain Img"
            value={thumblainImg}
            onChange={(e) => setthumblainImg(e.target.value)}
          />

          <h4 className="mt-5">Trailer Id</h4>
          <input
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Id Of Trailer"
            value={trailerVideoId}
            onChange={(e) => settrailerVideoId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <h4 className="mt-5">Quality</h4>
          <input
            className="form-control mr-1"
            aria-describedby="emailHelp"
            placeholder="Enter Quality"
            value={movieQuality}
            onChange={(e) => setmovieQuality(e.target.value)}
          />

          <h4 className="mt-5">Online Watching Url</h4>

          <input
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Url Of Online Watching"
            value={onlineWatchingUrl}
            onChange={(e) => setonlineWatchingUrl(e.target.value)}
          />
        </div>

        <div className="list-input mt-5">
          <div className="mt-5 text-center custom-list p-2">
            <h4>Screenshots</h4>
            <hr className="bg-light" />

            <div className="mb-4">
              <input
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Screenshots Links"
                value={screenshot}
                onChange={(e) => setscreenshot(e.target.value)}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    addToList("screen-shot");
                  }
                }}
              />

              <button
                onClick={() => addToList("screen-shot")}
                className="btn mt-3 btn-block btn-outline-light "
                type="button"
              >
                Add
              </button>
            </div>

            {screenShotList.length > 0 ? (
              <ol>
                {screenShotList.map((list, i) => (
                  <li className="mt-2" key={i}>
                    {list}
                  </li>
                ))}
              </ol>
            ) : (
              <h6>No Screenshots</h6>
            )}
          </div>
        </div>


        <div className="list-input mt-5">
          <div className="mt-5 text-center custom-list p-2">
            <h4>Download Links</h4>
            <hr className="bg-light" />

            <div className=" mb-4">
              <div className="d-flex">
                <input
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Download Links"
                  value={downloadLink}
                  onChange={(e) => setdownloadLink(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                      addToList("download-link");
                    }
                  }}
                />

                <select
                  value={quality}
                  onChange={(e) => setquality(e.target.value)}
                  className="browser-default custom-select ml-3"
                >
                  <option disabled>Quality</option>
                  <option>480p</option>
                  <option>720p</option>
                  <option>1080p</option>
                </select>
              </div>

              <button
                onClick={() => addToList("download-link")}
                className="btn btn-block btn-outline-light mt-3"
                type="button"
              >
                Add
              </button>
            </div>

            {downloadLinkList.length > 0 ? (
              <ol>
                {downloadLinkList.map((list, i) => (
                  <li className="mt-2" key={i}>
                    Quality - {list.Quality} : Url - {list.Url}
                
                  </li>
                ))}
              </ol>
            ) : (
              <h6>No Download Links</h6>
            )}
          </div>
        </div>
      </form>

      <button
        onClick={() => submitData()}
        className="btn my-5 btn-block btn-outline-light"
      >
        Submit
      </button>
    </div>
  );
}
