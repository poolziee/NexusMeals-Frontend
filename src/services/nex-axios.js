import axios from "axios";

const req = axios.create({
  withCredentials: true,
  // @ts-ignore
  baseURL: `${import.meta.env.VITE_HOST_URL}/`,
});

export default req;
