import axios from "axios";
import { message } from "antd";
import {
  getAccessToken,
  getRefreshToken,
  logout,
  storeEmployeeData,
} from "./helper";
export const config = {
  base_url: "http://localhost:5000/api/",
  image_path: "",
  version: 1,
};
export const request = (url, method, param, new_token = null) => {
  var access_token = getAccessToken();
  if (new_token != null) {
    access_token = new_token;
  }
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
        // logout();
        // message.error("You don't have permission access this method.");

        // ព្យាយាមបន្ត token ថ្មី
        return refreshToken(url, method, param);
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

const refreshToken = (url, method, param) => {
  const refresh_key = getRefreshToken();
  return axios({
    url: config.base_url + "employee/refresh-token",
    method: "post",
    data: { refresh_key: refresh_key },
  })
    .then((res) => {
      // message.success("refresh token success.");
      storeEmployeeData(res.data);
      var new_token = res.data.access_token;
      return request(url, method, param, new_token);
    })
    .catch((error) => {
      if (error) {
        logout();
      }
    });
};
