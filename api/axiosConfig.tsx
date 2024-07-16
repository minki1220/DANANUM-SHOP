import axios, { AxiosInstance } from "axios";

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
