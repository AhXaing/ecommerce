import { useEffect, useState } from "react";
import { request } from "../../share/request";
import { getAccessToken } from "../../share/helper";
import "https://unpkg.com/three/build/three.module.js";
import WebXRPolyfill from "webxr-polyfill";
const polyfill = new WebXRPolyfill();
const Menu = () => {
  useEffect(() => {
    getList();
  }, []);
  const url = "https://tv10.sabong24.tv:5443/CFTV02/play.html?name=CFTV02-01";
  const token =
    "&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6IlNCQ0NPQ0tUVjAxLTAxIiwidHlwZSI6InBsYXkiLCJleHAiOjE2OTYyNDM5MzEzLCJpYXQiOjE2OTYyMDc5MzF9.-AKFxTUKzPES1_w6n5inG0z5tNgaLJwjh4FX7pYucAs";
  const [list, setList] = useState([]);
  const getList = () => {
    var param = "?name=" + name;
    param += "&token=" + getAccessToken();
    request("play.html" + param, "get").then((res) => {
      if (res) {
        setList(res.list);
      }
    });
  };

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={url + "&token=" + getAccessToken()}
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Menu;
