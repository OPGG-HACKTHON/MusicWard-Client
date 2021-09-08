import Axios from "axios";
const axiosInstance = Axios.create({
  baseURL: "https://server.music-ward.com/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axiosInstance.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default axiosInstance;
