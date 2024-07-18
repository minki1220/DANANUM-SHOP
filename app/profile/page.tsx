"use client";

import { getUserInfo, UserInfo } from "@/api/user/profile";
import axios from "axios";

import { useEffect, useState } from "react";

export default function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <h1>{userInfo?.userEmail}</h1>
    </>
  );
}
