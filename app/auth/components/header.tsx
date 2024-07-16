import Link from "next/link";

export default function Header() {
  return (
    <>
      {/* 헤더 */}
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
    </>
  );
}
