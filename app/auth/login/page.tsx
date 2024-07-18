"use client";

import { useFormState } from "react-dom";
import { logIn } from "./actions";
import Input from "../components/input";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import Button from "../components/button";
import { privateApi } from "@/api/axiosConfig";
import axios from "axios";

export default function LogIn() {
  const [state, dispatch] = useFormState(logIn, null);

  const test = async () => {
    try {
      const res = await privateApi.get("/user/verification");
      console.log(res.data.role);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="userEmail"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.userEmail}
        />
        <Input
          name="userPassword"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.userPassword}
        />

        <Button text="Log in" />
      </form>
      <div onClick={test}>버튼</div>
      {/* <SocialLogin /> */}
    </div>
  );
}
