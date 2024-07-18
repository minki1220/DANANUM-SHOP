"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    deleteCookie(); // 로컬스토리지에 토큰값 삭제
    alert("로그아웃이 성공적으로 완료되었습니다.");
    router.push("/auth/login");
  };

  return <button onClick={() => handleLogout()}>로그아웃</button>;
}

export const deleteCookie = () => {
  if (typeof document !== "undefined") {
    document.cookie =
      "AccessToken" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};
