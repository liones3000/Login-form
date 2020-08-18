import axios from "axios";
import API_ENV from "../../config/api.config";
import interceptors from "./interceptors";

const instance = axios.create({
  baseURL: API_ENV.apiUrl,
  headers: {
    "Content-type": "application/json",
  },
});

interceptors(instance);

export default instance;
