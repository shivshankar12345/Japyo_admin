import { FormEvent, Fragment, Key, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { baseUrl } from "../config/config";
import Layout from "../components/Layout";
import {
  FaHome,
  FaList,
  FaTh,
  FaThLarge,
  FaFacebookMessenger,
  FaTimes,
} from "react-icons/fa";

import {
  Breadcrumb,
  Navbar,
  Pagination,
  Spinner,
  Table,
  Tabs,
} from "flowbite-react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MobileTop from "../components/MobileTop";
import InputText from "../components/InputText";
import InputEmail from "../components/InputEmail";
import InputPass from "../components/InputPass";
import { parseCookies } from "nookies";
import cookie from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminList from "../components/AdminList";
import { Dialog, Transition } from "@headlessui/react";

export async function getServerSideProps(_context: any) {
  const res = await fetch(`${baseUrl}/api/user/adminList?page=1`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}

const Setting = (data: any) => {
  const newdata = data.data;

  const cookies = parseCookies();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoding] = useState(false);
  const [loadingUp, setLodingUp] = useState(false);
  const [loadingUpPass, setLodingUpPass] = useState(false);
  const [loadingNew, setLodingNew] = useState(false);
  const [user, setUser] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    account_status: "",
    account_type: "",
  });

  const [userPass, setUserPass] = useState({
    user_id: "",
    password: "",
  });

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const updateNew = (e: { target: { name: any; value: any } }) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setLoding(true);
    setCurrentPage(newdata.currentPage);
    setTotalPages(newdata.totalPages);
    const userCookies = cookies?.user;
    const userInfo = JSON.parse(userCookies);
    // console.log(userInfo);
    setLoding(false);
    setUser({
      ...user,
      user_id: userInfo.user_id,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      phone_number: userInfo.phone_number,
      email: userInfo.email,
      account_status: userInfo.account_status,
      account_type: userInfo.account_type,
    });

    setUserPass({
      ...userPass,
      user_id: userInfo.user_id,
      password: "",
    });
  }, []);

  const updateUser = (e: { target: { name: any; value: any } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updatePass = (e: { target: { name: any; value: any } }) => {
    setUserPass({ ...userPass, [e.target.name]: e.target.value });
  };

  const submitProfileUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setLodingUp(true);
      const body = { user };
      const resultRes = await fetch(`/api/user/profileUpdate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await resultRes.json();
      console.log(result);

      if (result.status == false) {
        toast.error(result.error);
        setLodingUp(false);
      }

      if (result.status == true) {
        toast.success(result.message);
        cookie.set("user", JSON.stringify(result?.user));
        setLodingUp(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitPassChange = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setLodingUpPass(true);
      const body = { userPass };
      const resultRes = await fetch(`/api/user/PassChange`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await resultRes.json();
      console.log(result);

      if (result.status == false) {
        toast.error(result.error);
        setLodingUpPass(false);
      }

      if (result.status == true) {
        toast.success(result.message);
        cookie.set("user", JSON.stringify(result?.user));
        setLodingUpPass(false);
      }

      // await Router.push('/drafts')
    } catch (error) {
      console.error(error);
    }
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setLodingNew(true);
      const body = { newUser };
      const resultRes = await fetch(`/api/user/addAdminUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await resultRes.json();
      console.log(result);

      if (result.status == false) {
        toast.error(result.error);
        setLodingNew(false);
      }

      if (result.status == true) {
        toast.success(result.message);
        setLodingNew(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Setting</title>
        <meta name="description" content="Jaypo Admin Setting" />
        <link rel="icon" href="/assets/img/logo.svg" />
      </Head>
      <ToastContainer />
      <div className="main scrollbar-none scrollbar-rounded overflow-y-auto">
        <MobileTop title="Setting" />
        <div className="w-full p-2 mb-10">
          <div className="breadCrumb">
            <Breadcrumb
              aria-label="Solid background breadcrumb"
              className="bg-gray-50 py-3 px-5 dark:bg-gray-900 shadow-md"
            >
              <Breadcrumb.Item href="/" icon={FaThLarge}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/setting">Setting</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="content">
            <div className="content-body">
              <Tabs.Group aria-label="Tabs with underline" style="underline">
                <Tabs.Item active={true} title="Profile">
                  {loading ? (
                    <>
                      <div className="w-full h-48 flex place-items-center items-center justify-center text-center">
                        <Spinner
                          aria-label="Extra large spinner example"
                          size="xl"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full sm:flex">
                        <div className="w-full mb-1 sm:mb-0 sm:w-6/12 sm:p-2">
                          <form
                            onSubmit={submitProfileUpdate}
                            className="w-full border rounded-lg"
                          >
                            <input
                              type="hidden"
                              name="user_id"
                              value={user.user_id}
                            />
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
                                  onChange={updateUser}
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
                                  onChange={updateUser}
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
                                  onChange={updateUser}
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
                                  onChange={updateUser}
                                  placeholder="Email"
                                />
                              </div>
                              {/* <div>
                            <label
                              htmlFor="email"
                              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                            >
                              Account Status
                            </label>
                            <select
                              name="account_status"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option selected>Choose a account status</option>
                              <option value="active">active</option>
                              <option value="deactive">deactive</option>
                            </select>
                          </div> */}

                              <button className="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                                {loadingUp ? (
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
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>Update</>
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="w-full sm:w-6/12 sm:p-2">
                          <form
                            onSubmit={submitPassChange}
                            className="w-full border rounded-lg"
                          >
                            <input
                              type="hidden"
                              name="user_id"
                              value={user.user_id}
                            />
                            <div className="flex flex-col gap-4 p-4 md:p-8">
                              <div>
                                <label
                                  htmlFor="password"
                                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                                >
                                  Password
                                </label>
                                <InputPass
                                  value={userPass.password}
                                  name="password"
                                  onChange={updatePass}
                                  placeholder="Password"
                                />
                              </div>

                              <button className="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                                {loadingUpPass ? (
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
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>Password Change</>
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                </Tabs.Item>
                <Tabs.Item
                  title="Admin User"
                  className="w-full h-full flex justify-center overflow-x-auto"
                >
                  <AdminList
                    currentPage={currentPage}
                    totalPages={totalPages}
                    userList={newdata.users}
                  />
                </Tabs.Item>
                <Tabs.Item title="Add New Admin User">
                  <div className="w-full p-4">
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
                            value={newUser.first_name}
                            name="first_name"
                            onChange={updateNew}
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
                            value={newUser.last_name}
                            name="last_name"
                            onChange={updateNew}
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
                            value={newUser.phone_number}
                            name="phone_number"
                            onChange={updateNew}
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
                            value={newUser.email}
                            name="email"
                            onChange={updateNew}
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
                            value={newUser.password}
                            name="password"
                            onChange={updateNew}
                            placeholder="Password"
                          />
                        </div>

                        <button className="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                          {loadingNew ? (
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
                            <>Add User</>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
