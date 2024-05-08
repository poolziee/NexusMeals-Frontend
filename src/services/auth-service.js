import req from "./nex-axios";
import Cookies from "js-cookie";

const register = (data) => {
  return req.post("/auth/register", data);
};

const login = (data) => {
  return req.post("/auth/login", data).then((response) => {
    return response.data;
  });
};

const logout = () => {
  return req.get("/auth/logout");
};

const getCurrentUser = () => {
  const user = Cookies.get("current_user");
  if (user) {
    return JSON.parse(user);
  }
  return "";
};

const isAuthenticated = (role) => {
  if (getCurrentUser() === "") {
    return false;
  }
  return getCurrentUser().role === role;
};

const sessionExpired = () => {
  if (Cookies.get("current_user")) {
    return false;
  }
  console.log("User session expired.");
  return true;
};

const refreshToken = () => {
  return req.get("/auth/refresh");
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  sessionExpired,
  refreshToken,
};
