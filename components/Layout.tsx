import React, { ReactNode, useEffect, useState } from "react";
import { useRouter, Router } from "next/router";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Footer from "./Footer";
import { useSession } from "next-auth/react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const cookies = parseCookies();
  const { data: session } = useSession();

  useEffect(() => {
    document.body.classList.add("h-screen");
    document.body.classList.add("bg-gray-200");
    document.body.classList.add("dark:bg-gray-900");
  });

  useEffect(() => {
    if (!cookies?.user) {
      toast.error("PLease Login...");
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <ToastContainer />
      <div className="w-screen h-screen flex">
        <LeftSidebar />
        <div className="h-screen flex-1">
          <Header />
          <div className="w-full h-screen sm:height-90vh overflow-hidden">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
