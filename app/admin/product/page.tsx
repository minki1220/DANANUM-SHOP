"use client";

import LogoutButton from "@/components/LogOut-btn";
import { usePathname, useRouter } from "next/navigation";

export default function AdminProduct() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <div className="w-full min-h-[600px] p-4 bg-white">
          <main>
            <p className="flex justify-center text-xl font-mono font-semibold m-4">
              상품 관리
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col">
                <button
                  onClick={() => router.push(`${pathname}/Add`)}
                  className="flex justify-between font-semibold "
                >
                  <p>추가</p>
                  <p> {">"}</p>
                </button>
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => router.push(`${pathname}/Modify`)}
                  className="flex justify-between font-semibold "
                >
                  <p>수정</p>
                  <p> {">"}</p>
                </button>
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => router.push(`${pathname}/Delete`)}
                  className="flex justify-between font-semibold "
                >
                  <p>삭제</p>
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
