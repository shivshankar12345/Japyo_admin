import React, { FormEvent, ReactNode, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter, Router } from "next/router";
import cookie from "js-cookie";
import InputEmail from "../components/InputEmail";
import InputPass from "../components/InputPass";
import Head from "next/head";
import Link from "next/link";

const Logout = () => {
  const router = useRouter();
  cookie.remove("token");
  cookie.remove("user");
  toast.success("User Logout successfully!!!");

  useEffect(() => {
    router.push("/login");
  }, [router]);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Logout;
