import axios from "axios";
import { message } from "antd";
import { getAccessToken } from "./helper";
export const config = {
  base_url: "http://localhost:5000/api/",
  image_path: "",
  version: 1,
};
export const request = (url, method, param) => {
  const access_token = getAccessToken();
  // alert(access_token);
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
      var status = err.response?.status;
      if (status == 404) {
        message.error("Route Not Found");
      } else if (status == 401) {
        message.error("You don't have permission access this method.");
      } else if (status == 500) {
        message.error("Internal error Server.");
      } else {
        message.error(err.message);
      }
      return false;
    })
    .finally((final) => {
      console.log("Final", final);
    });
};
