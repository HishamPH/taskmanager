import axios from "axios";
import { Failed } from "../helper/popup";

const axiosInstance = axios.create({
  baseURL: "/api",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      const { data } = error.response;
      console.log(data);
      Failed("some kind interceptor error occured");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
