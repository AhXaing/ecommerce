import moment from "moment";

export const isEmptyOrNull = (vaule) => {
  return vaule == "" || vaule == null || vaule == undefined ? true : false;
};
export const getUser = () => {
  var user = localStorage.getItem("user");
  if (!isEmptyOrNull(user)) {
    user = JSON.parse(user);
    return user;
  } else {
    return null;
  }
};

export const getPermission = () => {
  var permission = localStorage.getItem("permission");
  if (!isEmptyOrNull(permission)) {
    permission = JSON.parse(permission);
    return permission;
  } else {
    return null;
  }
};

export const isPermission = (code_permission) => {
  const arrPermission = getPermission();
  if (arrPermission) {
    if (arrPermission.includes(code_permission)) {
      return true; // have permission
    }
    return false; // no permission
  } else {
    return false; // no permission
  }
};

export const getAccessToken = () => {
  var access_token = localStorage.getItem("access_token");
  if (!isEmptyOrNull(access_token)) {
    return access_token;
  } else {
    return null;
  }
};

export const getRefreshToken = () => {
  var refresh_token = localStorage.getItem("refresh_token");
  if (!isEmptyOrNull(refresh_token)) {
    return refresh_token;
  } else {
    return null;
  }
};

export const formatDateClient = (date) => {
  if (!isEmptyOrNull(date)) {
    return moment(date).format("DD/MM/YYYY");
  }
  return null;
};

export const formatDateServer = (date) => {
  if (!isEmptyOrNull(date)) {
    return moment(date).format("YYYY-MM-DD");
  }
  return null;
};
