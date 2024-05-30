import axios from "axios";

const req = axios.create({
  withCredentials: true,
  // TODO: get from env variable/config.
  // @ts-ignore
  baseURL: `http://${import.meta.env.VITE_DOMAIN}/`,
});

export default req;
