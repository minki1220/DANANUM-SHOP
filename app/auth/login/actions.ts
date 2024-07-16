import { privateApi } from "@/api/axiosConfig";
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
    const res = await privateApi.post("/public/auth/login", data);

    if (res.data.success) {
      console.log(res.data);
    } else {
      console.error("API error:", res.data);
    }
  } catch (signupError) {
    console.error("Error during signup:", signupError);
  }
}
