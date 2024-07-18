// // middleware.ts

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getCookie } from "./components/cookies";
// import { GetUserVerify, VerifiedData } from "./hook/UserInfo";

// export async function middleware(request: NextRequest) {
//   const token = getCookie();
//   const { pathname } = request.nextUrl;

//   // 예외 경로 설정
//   const exceptions = ["/auth/login", "/auth/signup"];

//   // 예외 경로일 경우 미들웨어 통과
//   if (exceptions.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // 토큰이 없을 경우 리다이렉트
//   if (!token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // 인증 상태 확인
//   try {
//     const verifiedUser: VerifiedData = await GetUserVerify();

//     if (verifiedUser.role === "ROLE_USER" && pathname.includes("/admin")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (verifiedUser.role === "ROLE_ADMIN" && !pathname.includes("/admin")) {
//       return NextResponse.redirect(new URL("/admin", request.url));
//     }
//   } catch (error) {
//     console.error("Failed to verify user:", error);
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }
