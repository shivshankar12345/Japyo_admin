// @ts-nocheck
import { FormEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Head from "next/head";
import InputText from "../components/InputText";
import InputEmail from "../components/InputEmail";
import InputPass from "../components/InputPass";
import Router from "next/router";

import { parseCookies } from "nookies";

export default function Register() {
  const [loading, setLoding] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const updatePost = (e: { target: { name: any; value: any } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const cookies = parseCookies();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      toast.success("Login Success");
      router.push("/");
    }

    if (cookies?.user) {
      router.push("/");
    }
  }, [router]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sent, setSent] = useState(false);

  async function sendUser(data: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
  }) {
    const saved = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        date: new Date(),
      }),
    });
    const result = await saved.json();

    if (result.status == false) {
      toast.error(result.error);
    }

    if (result.status == true) {
      toast.success(result.message);
      setTimeout(() => {
        Router.push("/login");
      }, 1000);
    }

    console.log(result);
  }

  function handlePostDelivery(e: FormEvent) {
    e.preventDefault();

    if (user.password !== user.conPassword) {
      toast.error("passwords do not match!");
      // console.log("passwords do not match")
      return;
    }

    const cuser = cookies?.user
      ? JSON.parse(cookies.user)
      : session?.user
      ? session?.user
      : "";

    // console.log(user.email, user.password, user.first_name, user.last_name)

    sendUser(user)
      .then((saved) => {
        setSent(typeof saved !== "undefined");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { user };
      const result = await fetch(`/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(result);

      // await Router.push('/drafts')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Regidter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
            Register
          </h2>

          <form
            onSubmit={submitData}
            className="max-w-lg border rounded-lg mx-auto"
          >
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="first-name"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  First name*
                </label>
                <InputText
                  value={user.first_name}
                  name="first_name"
                  onChange={updatePost}
                  placeholder="First Name"
                />
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Last name*
                </label>
                <InputText
                  value={user.last_name}
                  name="last_name"
                  onChange={updatePost}
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Phone Number*
                </label>
                <InputText
                  value={user.phone_number}
                  name="phone_number"
                  onChange={updatePost}
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Email
                </label>
                <InputEmail
                  value={user.email}
                  name="email"
                  onChange={updatePost}
                  placeholder="Email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Password
                </label>
                <InputPass
                  value={user.password}
                  name="password"
                  onChange={updatePost}
                  placeholder="Password"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Con Password
                </label>
                <InputPass
                  value={user.conPassword}
                  name="conPassword"
                  onChange={updatePost}
                  placeholder="con Password"
                />
              </div>

              <button className="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                Sign Up
              </button>

              {/* <div className="flex justify-center items-center relative">
                <span className="h-px bg-gray-300 absolute inset-x-0"></span>
                <span className="bg-white text-gray-400 text-sm relative px-4">Log in with social</span>
                </div> */}
              {/*

                <button className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3">
                <svg className="w-5 h-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z" fill="white" />
                </svg>

                Continue with Facebook
                </button>

                <button className="flex justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 border border-gray-300 focus-visible:ring ring-gray-300 text-gray-800 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3">
                <svg className="w-5 h-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z" fill="#4285F4" />
                    <path d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z" fill="#34A853" />
                    <path d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z" fill="#FBBC05" />
                    <path d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z" fill="#EA4335" />
                </svg>

                Continue with Google
                </button> */}
            </div>

            <div className="flex justify-center items-center bg-gray-100 p-4">
              <p className="text-gray-500 text-sm text-center">
                {`Don't have an account?`}{" "}
                <a
                  href="#"
                  className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
