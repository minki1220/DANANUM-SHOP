"use client";

import Category from "@/app/auth/components/Category";
import Header from "@/app/auth/components/header";
import Search from "@/app/auth/components/Search";
import SwiperTest from "@/app/auth/components/swiper";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="overflow-y-scroll h-screen">
      <Header />
      {/* navbar */}
      <div className="w-full sticky top-0 z-10 justify-center">
        <nav className="flex items-center bg-white justify-between py-5 ">
          <div className="flex pl-28">
            <Link href="/">
              <h1 className="text-4xl font-bold">L:DIA</h1>
            </Link>
          </div>
          <Category />
          <Search />
        </nav>
      </div>
      <div
        className={`page h-screen flex justify-center items-center bg-amber-50 ${
          currentPage === 1 ? "opacity-1" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl font-bold">첫 번째 페이지</h1>
        <p className="text-lg">여기는 첫 번째 페이지입니다.</p>
      </div>
      <div
        className={` h-screen flex flex-col bg-white ${
          currentPage === 1 ? "opacity-1" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center py-16 gap-4">
          <h1 className="text-4xl font-bold">WHEREVER! EVERYONE!</h1>
          <p className="text-lg">S/S시즌 다양하게 전개된 3가지 라인</p>
        </div>
        <div>
          <SwiperTest />
        </div>
      </div>
      <div
        className={`page h-screen flex justify-center items-center bg-green-200 ${
          currentPage === 1 ? "opacity-1" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl font-bold">세 번째 페이지</h1>
        <p className="text-lg">여기는 세 번째 페이지입니다.</p>
      </div>

      {/* 추가적인 페이지들도 이와 같은 방식으로 추가할 수 있습니다. */}
    </div>
  );
}
