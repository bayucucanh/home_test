import Image from "next/image";
import { Inter } from "next/font/google";
import LoginPage from "./login";
import { useState, useEffect } from "react";
import MainPage from "./mainpage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const geToken = localStorage.getItem("token");
    if (geToken) {
      setToken(geToken);
    }
  }, [token]);

  return <div>{!token ? <LoginPage /> : <MainPage />}</div>;
}
