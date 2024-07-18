import { privateApi } from "../axiosConfig";

export interface UserInfo {
  userCid: number;
  userEmail: string;
  userName: string;
  profileImgPath: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await privateApi.get("/user/info");
    return response.data.userInfo;
  } catch (error) {
    throw error;
  }
};
