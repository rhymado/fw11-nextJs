import axios from "axios";
import Cookie from "js-cookie";

const axiosApiIntances = axios.create({
  baseURL: "https://zwalet.herokuapp.com",
});

// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      Authorization: `Bearer ${Cookie.get("token")}`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApiIntances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) {
      // console.log(error.response);
      alert(error.response.data.msg);
      Cookie.remove("token");
      Cookie.remove("id");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default axiosApiIntances;
