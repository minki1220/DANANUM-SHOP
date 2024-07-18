import { getCookie, setCookie } from "@/components/cookies";
import axios, { AxiosInstance } from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: "",
  },
});

// 요청 인터셉터
privateApi.interceptors.request.use(
  (config) => {
    const token = getCookie();
    if (token) {
      privateApi.defaults.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 응답 인터셉터
privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 403) {
      const newAccessToken = error.response.headers["Authorization"];
      setCookie(newAccessToken);
    }
    return Promise.reject(error);
  }
);
