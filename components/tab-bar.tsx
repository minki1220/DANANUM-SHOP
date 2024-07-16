"use client";

import {
  HomeIcon as SolidHomeIcon,
  HeartIcon as SolidHeartIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  HeartIcon as OutlineHeartIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center">
      <div className="fixed bottom-0 w-full mx-auto max-w-screen-sm grid grid-cols-3 px-5 py-3 *:text-white bg-black">
        <Link
          href="/mypage/my-like/product"
          className="flex flex-col items-center gap-px"
        >
          {pathname === "/mypage/my-like/product" ? (
            <SolidHeartIcon className="w-7 h-7" />
          ) : (
            <OutlineHeartIcon className="w-7 h-7" />
          )}
          <span>좋아요</span>
        </Link>
        <Link href="/" className="flex flex-col items-center gap-px">
          {pathname === "/" ? (
            <SolidHomeIcon className="w-7 h-7" />
          ) : (
            <OutlineHomeIcon className="w-7 h-7" />
          )}
          <span>홈</span>
        </Link>
        <Link href="/mypage" className="flex flex-col items-center gap-px">
          {pathname === "/mypage" ? (
            <SolidUserIcon className="w-7 h-7" />
          ) : (
            <OutlineUserIcon className="w-7 h-7" />
          )}
          <span>마이</span>
        </Link>
      </div>
    </div>
  );
}
