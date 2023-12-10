import axios from "axios";
import { getAccessToken } from "./helper";
export const config = {
  base_url: "http://localhost:5000/api/",
  image_path: "",
  version: 1,
};
export const request = (url, method, param) => {
  const access_token = getAccessToken();
  return axios({
    url: config.base_url + url,
    method: method,
    data: param,
    headers: { Authorization: "Bearer " + access_token },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error: ", err);
      return false;
    });
  // .finally((final) => {
  //   console.log("Final", final);
  // });
};
