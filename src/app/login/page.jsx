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
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    setError(false);
    setError("");
    setEmailError("");
    setPasswordError("");

    // Validate Email:
    if (!email) {
      setEmailError("Email cannot be empty.");
      setLoginInProgress(false);
      return;
    }
    // Validate password:
    if (!password) {
      setPasswordError("Password cannot be empty.");
      setLoginInProgress(false);
      return;
    }

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  }
  return (
    <div className={`${quantico.className}`}>
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      {error && (
        <div className="my-4 text-center">
          An error has occurred.
          <br />
          Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-1 mb-2">
          <label className="text-zinc-200">Email</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => setEmail(ev.target.value)}
            className="border rounded-md border-gray-500 p-2 -mt-1"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label className="text-zinc-200">Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => setPassword(ev.target.value)}
            className="border rounded-md border-gray-500 p-2 -mt-1"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <button disabled={loginInProgress} type="submit" className="mt-2">
          Login
        </button>
        <div className="my-4 text-center text-white">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-2 items-center justify-center bg-emerald-600 text-white mt-1 mb-2"
        >
          <FcGoogle /> Login with google
        </button>
        <div className="text-center my-4 text-white border-t pt-4">
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
