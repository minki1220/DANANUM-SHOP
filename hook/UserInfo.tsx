"use client";

import { privateApi } from "@/api/axiosConfig";

// interface UserInfo {
//   userCid: number;
//   userEmail: string;
//   userName: string;
//   profileImgPath: string;
// }

// export default async function GetUserInfo(): Promise<UserInfo> {
//   try {
//     const res = await privateApi.get("/user/info");
//     return res.data.userInfo;
//   } catch (error) {
//     throw error;
//   }
// }

export interface VerifiedData {
  role: string;
}

export const GetUserVerify = async (): Promise<VerifiedData> => {
  try {
    const response = await privateApi.get("/user/verification");
    return response.data;
  } catch (error) {
    throw error;
  }
};
