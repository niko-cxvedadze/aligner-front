import axios from "axios";

export const privateAxios = axios.create({
  baseURL: "http://localhost:4000/api",
});
