// src/components/Login.js
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "@/pages/api/api";
import Link from "next/link";
import { useRouter } from "next/router";

export function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email: email, password: password });
      console.log(response);
      if (response?.data?.data?.token) {
        // Token diterima, akan dihandle oleh komponen Auth
        localStorage.setItem("token", response?.data?.data?.token);
        router.push("/mainpage");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token__", token);
  }, []);

  return (
    // <div>
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         type="text"
    //         id="email"
    //         name="email"
    //         value={email}
    //         onChange={onChangeEmail}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         value={password}
    //         onChange={onChangePassword}
    //       />
    //     </div>
    //     <button type="submit" disabled={isLoading}>
    //       Login
    //     </button>
    //     {isError && <p>Login error. Please try again.</p>}
    //   </form>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
