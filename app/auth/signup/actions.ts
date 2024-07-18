import { redirect } from "next/navigation";
import { z } from "zod";
import { publicApi } from "@/api/axiosConfig";

const formSchema = z
  .object({
    userName: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
      })
      .min(3, "Way too short!!!")
      .max(10, "That is too looooong!")
      .trim()
      .toLowerCase()
      .refine(
        (userName) => !userName.includes("potato"),
        "No potatoes allowed!"
      ),
    userEmail: z
      .string()
      .email()
      .toLowerCase()
      .refine(async (email) => {
        try {
          const response = await publicApi.get(
            `/public/auth/duplicate-test/email?userEmail=${encodeURIComponent(
              email
            )}`
          );
          return !response.data.duplicate;
        } catch (error) {
          console.error("Error checking email:", error);
          return false;
        }
      }, "이미 중복된 이메일입니다."),
    userPassword: z.string().min(4),
    confirm_password: z.string().min(4),
  })
  .superRefine(({ userPassword, confirm_password }, ctx) => {
    if (userPassword !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Two passwords should be equal",
        path: ["confirm_password"],
      });
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    userName: formData.get("username"),
    userEmail: formData.get("userEmail"),
    userPassword: formData.get("userPassword"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.spa(data);
  let shouldRedirect = false;

  if (!result.success) {
    return result.error.flatten();
  } else {
    try {
      const signupResponse = await publicApi.post("/public/auth/signup", data);

      if (signupResponse.data.success) {
        shouldRedirect = true;
      } else {
        console.error("API error:", signupResponse.data);
      }
    } catch (signupError) {
      console.error("Error during signup:", signupError);
    }

    if (shouldRedirect) {
      redirect("/auth/login");
    }
  }
}
