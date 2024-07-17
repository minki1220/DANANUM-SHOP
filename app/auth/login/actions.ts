import { publicApi } from "@/api/axiosConfig";
import { setCookie } from "@/components/cookies";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  userEmail: z.string().email().toLowerCase(),
  userPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    userEmail: formData.get("userEmail"),
    userPassword: formData.get("userPassword"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }
  try {
    const res = await publicApi.post("/public/auth/login", data);

    if (res.data.success) {
      console.log(res.data);
      // 응답 헤더에서 Authorization 토큰을 추출하여 쿠키에 저장하는 부분은 응답 인터셉터에서 처리됨
      // 쿠키 설정 로직 작성
      const authorization = res.headers["authorization"];
      console.log(res);

      if (authorization && authorization.startsWith("Bearer ")) {
        const token = authorization.substring(7); // "Bearer " 이후의 토큰 부분 추출
        console.log(token);
        setCookie(token);
      }
    } else {
      console.error("API error:", res.data);
    }
  } catch (signupError) {
    console.error("Error during signup:", signupError);
  }
}
