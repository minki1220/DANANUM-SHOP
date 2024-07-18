import { getCookie } from "@/components/cookies";
import LogoutButton from "@/components/LogOut-btn";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookie();
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setIsLoading(false); // 로딩 완료
  }, []);

  if (isLoading) {
    return null; // 로딩 중에는 아무것도 렌더링하지 않음
  }

  return (
    <>
      {isLogin ? (
        <div className="flex justify-end w-full px-5 py-3 gap-3 text-xs bg-black text-white pr-28 ">
          <Link href="/profile" className="text-white">
            <button>프로필</button>
          </Link>
          <Link href="/" className="text-white">
            <button>장바구니</button>
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex justify-end w-full px-5 py-3 gap-3 text-xs bg-black text-white pr-28 ">
          <Link href="/auth/login" className="text-white">
            <button>로그인</button>
          </Link>
          <Link href="/auth/signup" className="text-white">
            <button>회원가입</button>
          </Link>
          <Link href="/" className="text-white">
            <button>장바구니</button>
          </Link>
        </div>
      )}
    </>
  );
}
