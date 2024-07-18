import { getCookie, setCookie } from "@/components/cookies";
import axios, { AxiosError, AxiosInstance } from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  // headers: {
  //   Authorization: "",
  // },
});

// 요청 인터셉터
privateApi.interceptors.request.use(
  (config) => {
    const token = getCookie("token"); // 'token' 쿠키 가져오기
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    try {
      if (error.response && error.response.status === 403) {
        console.log("Response headers:", error.response.headers); // 모든 헤더 출력
        const authorizationHeader = error.response.headers["authorization"]; // 응답 헤더에서 'authorization' 가져오기
        console.log("Authorization header:", authorizationHeader); // 디버깅을 위해 콘솔 출력

        if (authorizationHeader) {
          const newAccessToken = authorizationHeader.replace("Bearer ", ""); // 'Bearer ' 제거
          console.log("New access token received:", newAccessToken);
          setCookie(newAccessToken); // 새로운 엑세스 토큰을 'token' 쿠키에 저장
          privateApi.defaults.headers[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          if (error.config) {
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            const response = await axios.request(error.config);
            return response;
          } else {
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    } catch (err) {
      console.error("Error handling Axios error:", err);
      return Promise.reject(err);
    }
  }
);

// 토큰 설정 함수
export const setToken = (token: string) => {
  privateApi.defaults.headers["Authorization"] = `Bearer ${token}`;
};
