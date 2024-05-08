import axios from "axios";

const req = axios.create({
  withCredentials: true,
  // TODO: get from env variable/config.
  baseURL: "http://localhost:3000/",
});

export default req;
