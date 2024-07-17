import { getCookie } from "@/components/cookies";
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
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
      privateApi.defaults.headers.common.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 토큰 재발급 함수
const getNewAccessToken = async () => {
  try {
    const response = await privateApi.get("/user/new-token");
    return response.data.accessToken;
  } catch (error) {
    console.error("Error while fetching new access token", error);
    throw error;
  }
};

// 응답 인터셉터
privateApi.interceptors.response.use(
  (response) => {
    // 응답 헤더에서 Authorization 토큰을 추출하여 쿠키에 저장
    const authHeader = response.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7); // "Bearer " 이후의 토큰 부분 추출
      Cookies.set("AccessToken", token, { expires: 1 }); // 1일 동안 유효한 쿠키로 설정
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await getNewAccessToken();
        Cookies.set("AccessToken", newAccessToken, { expires: 1 }); // 1일 동안 유효한 쿠키로 설정
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 이전 요청을 새로운 토큰으로 재시도
        return privateApi(originalRequest);
      } catch (tokenError) {
        return Promise.reject(tokenError);
      }
    }

    return Promise.reject(error);
  }
);
