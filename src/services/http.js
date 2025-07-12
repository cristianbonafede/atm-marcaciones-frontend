import axios from "axios";
import { getToken } from "./security";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Ocp-Apim-Subscription-Key"] =
  process.env.REACT_APP_API_KEY;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem("token");
      window.location.replace("/auth/login");
    }

    return Promise.reject(error);
  }
);

const httpGet = async (url) => {
  return await axios.get(url, {
    headers: { token: getToken() },
  });
};

const httpPost = async (url, data) => {
  return await axios.post(url, data, {
    headers: { token: getToken() },
  });
};

const httpPatch = async (url, data) => {
  return await axios.patch(url, data, {
    headers: { token: getToken() },
  });
};

const httpPut = async (url, data) => {
  return await axios.put(url, data, {
    headers: { token: getToken() },
  });
};

const httpDelete = async (url) => {
  return await axios.delete(url, {
    headers: { token: getToken() },
  });
};

const http = {
  get: httpGet,
  post: httpPost,
  patch: httpPatch,
  put: httpPut,
  delete: httpDelete,
};

export default http;
