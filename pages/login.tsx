import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter, Router } from "next/router";
import InputEmail from "../components/InputEmail";
import InputPass from "../components/InputPass";
import cookie from "js-cookie";
import { parseCookies } from "nookies";
import {
  useSession,
  signIn,
  getSession,
  GetSessionParams,
} from "next-auth/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loading, setLoding] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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
  }, [router, session]);

  const updatePost = (e: { target: { name: any; value: any } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [sent, setSent] = useState(false);

  async function sendLogin(data: { email: string; password: string }) {
    const login = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        date: new Date(),
      }),
    });

    const result = await login.json();

    // console.log(result);

    if (result.status == false) {
      toast.error(result.error);
      setLoding(false);
    }

    if (result.status == true) {
      // toast.success(result.message);
      cookie.set("token", result?.token);
      cookie.set("user", JSON.stringify(result?.user));

      setTimeout(() => {
        router.push("/");
      }, 1000);

      setLoding(false);
    }
  }

  function SubmitHandler(e: FormEvent) {
    e.preventDefault();

    setLoding(true);
    sendLogin(user)
      .then((saved) => {
        // Router.push("/login");
        setSent(typeof saved !== "undefined");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Head>
        <title>Jaypo Admin Login</title>
        <meta name="description" content="Jaypo Admin Login" />
        <link rel="icon" href="/assets/img/logo.svg" />
      </Head>
      <ToastContainer />

      <div className="w-screen h-screen bg-white flex items-center ">
        <div className="w-full">
          <div className="w-full flex items-center justify-center">
            <img
              src="./assets/img/logo.svg"
              className="w-14 h-14 cursor-pointer duration-500 z-50"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <h6 className="text-gray-800 text-lg font-bold text-center mb-4 md:mb-8">
            Japyo admin Login
          </h6>
          <form
            onSubmit={SubmitHandler}
            className="max-w-lg border rounded-lg mx-auto"
          >
            <div className="flex flex-col gap-4 p-4 md:p-8">
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

              <button className="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                {loading ? (
                  <>
                    <div
                      role="status"
                      className="w-full flex items-center justify-center"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                ) : (
                  <>Log in</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
