"use client";

import NavBar from "@/app/auth/components/Category";
import Header from "@/app/auth/components/header";

export default function Loading() {
  return (
    <div className="overflow-y-scroll h-screen flex flex-col">
      <Header />
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-5">
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-20">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <div className="flex flex-col *:rounded-md gap-5 ">
                <div className="size-60 bg-neutral-700 " />
                <div className="bg-neutral-700 h-10 w-60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
