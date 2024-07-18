"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "../cookies";
import { GetUserVerify } from "@/hook/UserInfo";
import { setToken } from "@/api/axiosConfig";

export default function AuthCheck() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = getCookie();
    const exceptions = ["/auth/login", "/auth/signup", "/category/bedding"];
    const isException = exceptions.includes(pathname);

    const checkVerified = async () => {
      const verifiedUser = await GetUserVerify();

      if (verifiedUser.role === "ROLE_USER") {
        if (pathname.includes("/admin")) {
          router.push("/"); // 관리자가 아닌 사용자가 admin 경로에 접근 시 리다이렉트
        }
      } else if (verifiedUser.role === "ROLE_ADMIN") {
        const adminUrl = "/admin";
        if (!pathname.includes(adminUrl)) {
          router.push(adminUrl);
        }
      }
    };

    if (token && token !== "") {
      setToken(token);
      checkVerified();
    } else if (!isException) {
      router.push("/");
    }
  }, [router, pathname]);

  return null;
}
