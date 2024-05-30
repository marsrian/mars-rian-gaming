"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { quantico } from "@/utils/fonts";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  }
  return (
    <div className={`${quantico.className}`}>
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-1 mb-2">
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => setEmail(ev.target.value)}
            className="border rounded-md border-gray-500 p-2"
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => setPassword(ev.target.value)}
            className="border rounded-md border-gray-500 p-2"
          />
        </div>
        <button disabled={loginInProgress} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-2 items-center justify-center bg-emerald-600 text-white mt-1 mb-2"
        >
          <FcGoogle /> Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
        Don&apos;t have an account?{" "}
          <Link className="underline" href="/signup" >
          SignUp here &raquo;
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
