"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setError(false);
    setError("");
    setEmailError("");
    setPasswordError("");
    // Validate Email:
    if (!email) {
      setEmailError("Email cannot be empty.");
      setCreatingUser(false);
      return;
    }
    // Validate password:
    if (!password) {
      setPasswordError("Password cannot be empty.");
      setCreatingUser(false);
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      setCreatingUser(false);
      return;
    }
    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <div>
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created.
          <br />
          Now you can{" "}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occurred.
          <br />
          Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-1 mb-2">
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
            className="border rounded-md border-gray-500 p-2"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
            className="border rounded-md border-gray-500 p-2"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          {/* <Image src={"/google.png"} alt={""} width={24} height={24} /> */}
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
      {/* <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 font-lg">
          Login
        </Link>
      </p> */}
    </div>
  );
};

export default SignUpPage;
