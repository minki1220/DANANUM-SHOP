"use client";

import LogoutButton from "@/components/LogOut-btn";
import { usePathname, useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <div className="w-full min-h-[600px] p-4 bg-white">
          <main>
            <p className="flex justify-center text-xl font-mono font-semibold m-4">
              관리자
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col">
                <button
                  onClick={() => router.push(`${pathname}/product`)}
                  className="flex justify-between font-semibold "
                >
                  <p>상품 관리</p>
                  <p> {">"}</p>
                </button>
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => router.push(`${pathname}/inquiry`)}
                  className="flex justify-between font-semibold "
                >
                  <p>문의 관리</p>
                  <p> {">"}</p>
                </button>
              </li>

              <li className="flex justify-end">
                <LogoutButton />
              </li>
            </ul>
          </main>
        </div>
      </div>
    </div>
  );
}
