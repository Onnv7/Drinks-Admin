import axios from "axios";
import AuthApi from "./auth.api";
import { storageManager } from "../../helper/storager";
import { cookier } from "../../helper/cookier";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosPrivateForm = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" }, //multipart/form-data application/json
  withCredentials: true,
});

axiosPrivateForm.interceptors.request.use(
  (req) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  function error() {
    return Promise.reject(error);
  }
);

axiosPrivateForm.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const status = error.response ? error.response.status : 500;
    if (status === 401) {
      // localStorage.clear();
      try {
        const response = await AuthApi.refreshToken();
        error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        storageManager.setToken(response.data.accessToken);
        return axiosPrivate(error.config);
      } catch (error) {
        window.location.assign("/");
        storageManager.clearStore();
        Cookies.remove("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }, //multipart/form-data application/json
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (req) => {
    const token = storageManager.getToken();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  function error() {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const status = error.response ? error.response.status : 500;
    if (status === 401) {
      // localStorage.clear();
      try {
        const response = await AuthApi.refreshToken();
        error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        storageManager.setToken(response.data.accessToken);
        return axiosPrivate(error.config);
      } catch (error) {
        window.location.assign("/");
        storageManager.clearStore();
        Cookies.remove("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosPrivate, axiosPrivateForm };
