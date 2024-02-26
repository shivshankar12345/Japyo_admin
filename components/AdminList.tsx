import { Dialog, Transition } from "@headlessui/react";
import { Pagination, Spinner, Table } from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";
import { FaEye, FaLock, FaTimes, FaTrash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import AccountStatus from "./AccountStatus";
import { baseUrl } from "../config/config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InputText from "../components/InputText";
import InputEmail from "../components/InputEmail";
import InputPass from "../components/InputPass";
import { setTimeout } from "timers";

interface AdminProps {
  currentPage?: any;
  totalPages?: any;
  userList?: any;
}

interface AdminUserProfile {
  user_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  profile_picture: string;
  account_status: string;
  account_type: string;
}

export async function getServerSideProps(_context: any) {
  const res = await fetch(`${baseUrl}/api/user/adminList?page=1`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}

const AdminList = (data: any) => {
  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  // const { currentPage, totalPages, userList } = props;

  const [cPage, setCurrentPage] = useState(1);
  const [tPages, setTotalPages] = useState(1);
  const [adminList, setAdminList] = useState([]);

  const [loading, setLoding] = useState(false);
  const [loadingUp, setLodingUp] = useState(false);
  const [loadingUpPass, setLodingUpPass] = useState(false);
  const [loadingUpDel, setLodingUpDel] = useState(false);

  const [open, setOpen] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [userDelID, setUserDelID] = useState<any>();
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

  useEffect(() => {
    setLoding(true);
    setCurrentPage(data?.currentPage);
    setTotalPages(data?.totalPages);
    setTimeout(() => {
      setAdminList(data?.userList);
      setLoding(false);
    }, 2000);
  }, []);

  const onPageChange = async (e: any) => {
    setLoding(true);
    const res = await fetch(`${baseUrl}/api/user/adminList?page=${e}`);
    const data = await res.json();
    // console.log(data);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);
    setAdminList(data.users);
    setLoding(false);
  };

  const UserProfileHandler = async (user_id: any) => {
    setOpen(true);
    setLoadingProfile(true);
    const res = await fetch(`${baseUrl}/api/user/adminUser?id=${user_id}`);
    const data = await res.json();
    setUser({
      ...user,
      user_id: data.user.user_id,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      phone_number: data.user.phone_number,
      email: data.user.email,
      account_status: data.user.account_status,
      account_type: data.user.account_type,
    });
    setLoadingProfile(false);
  };

  const UserPasswordHandler = async (user_id: any) => {
    setOpenPass(true);
    setLodingUpPass(true);

    setUserPass({
      ...userPass,
      user_id: user_id,
      password: "",
    });
    setLodingUpPass(false);
  };

  const UserDeleteHandler = async (user_id: any) => {
    setOpenDel(true);
    setLodingUpDel(true);

    setUserDelID(user_id);
    setLodingUpDel(false);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenPass(false);
    setOpenDel(false);
  };

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

      onPageChange(cPage);

      if (result.status == false) {
        toast.error(result.error);
        setLodingUp(false);
      }

      if (result.status == true) {
        toast.success(result.message);
        setLodingUp(false);
        setOpen(false);
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
      onPageChange(cPage);

      if (result.status == false) {
        toast.error(result.error);
        setLodingUpPass(false);
      }

      if (result.status == true) {
        toast.success(result.message);
        setLodingUpPass(false);
        setOpenPass(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitUserDelete = async (user_id: any) => {
    try {
      setLodingUpDel(true);
      const body = { user_id };
      const resultRes = await fetch(`/api/user/adminDel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await resultRes.json();
      onPageChange(cPage);

      if (result.status == false) {
        toast.error(result.error);
        setLodingUpDel(false);
      }

      if (result.status == true) {
        toast.success(result.message);
        setLodingUpDel(false);
        setOpenDel(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full">
        {loading ? (
          <>
            <Skeleton className="h-12" count={10} />
          </>
        ) : (
          <>
            <Table hoverable={true}>
              <Table.Head className="bg-gray-700 border-gray-700  dark:border-gray-700 dark:bg-gray-800">
                <Table.HeadCell>Profile Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Phone</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {adminList.map((user: any) => (
                  <>
                    {/* {console.log(user)} */}
                    <Table.Row
                      key={user.user_id}
                      id={user.user_id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>
                        {user.first_name} {user.last_name}
                      </Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.phone_number}</Table.Cell>
                      <Table.Cell className="capitalize">
                        {user.account_status}
                      </Table.Cell>
                      <Table.Cell className="capitalize">
                        {user.account_type}
                      </Table.Cell>
                      <Table.Cell className="flex gap-1">
                        <div className="w-3/12 mt-2 sm:h-6 lg:h-9">
                          <button
                            className="w-full mt-2 sm:h-6 lg:h-9 bg-blue-600 hover:bg-blue-700 hover:text-white text-white lg:py-1 px-1 lg:px-2 rounded flex items-center justify-center text-right focus:outline-none"
                            onClick={() => UserProfileHandler(user.user_id)}
                          >
                            <FaEye className="mr-3 ml-1 sm:mr-1 text-xs lg:text-base font-thin lg:font-semibold" />
                            <span className="flex cursor-pointer text-right text-xs lg:text-sm font-semibold subpixel-antialiased">
                              Profile
                            </span>
                          </button>
                        </div>
                        <div className="w-3/12 mt-2 sm:h-6 lg:h-9">
                          <button
                            className="w-full mt-2 sm:h-6 lg:h-9 bg-green-600 hover:bg-green-700 hover:text-white text-white lg:py-1 px-1 lg:px-2 rounded flex items-center justify-center text-right focus:outline-none"
                            onClick={() => UserPasswordHandler(user.user_id)}
                          >
                            <FaLock className="mr-3 ml-1 sm:mr-1 text-xs lg:text-base font-thin lg:font-semibold" />
                            <span className="flex cursor-pointer text-right text-xs lg:text-sm font-semibold subpixel-antialiased">
                              Password
                            </span>
                          </button>
                        </div>
                        <div className="w-3/12 mt-2 sm:h-6 lg:h-9">
                          <button
                            className="w-full mt-2 sm:h-6 lg:h-9 bg-red-600 hover:bg-red-700 hover:text-white text-white lg:py-1 px-1 lg:px-2 rounded flex items-center justify-center text-right focus:outline-none"
                            onClick={() => UserDeleteHandler(user.user_id)}
                          >
                            <FaTrash className="mr-3 ml-1 sm:mr-1 text-xs lg:text-base font-thin lg:font-semibold" />
                            <span className="flex cursor-pointer text-right text-xs lg:text-sm font-semibold subpixel-antialiased">
                              Delete
                            </span>
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  </>
                ))}
              </Table.Body>
            </Table>
            <Pagination
              currentPage={cPage}
              onPageChange={onPageChange}
              showIcons={true}
              totalPages={tPages}
              className="mt-6 mb-6"
            />
          </>
        )}
      </div>
      <div className="w-full">
        {open ? (
          <>
            <Transition appear show={open} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={handleClose}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                        <div className="w-full h-10 p-4 bg-gray-200 flex items-center">
                          <div className="w-6/12">
                            <Dialog.Title
                              as="h3"
                              className="text-sm font-medium antialiased leading-6 text-green-700 "
                            >
                              Admin User Profile
                            </Dialog.Title>
                          </div>
                          <div className="w-6/12 flex justify-end text-right">
                            <button
                              className="focus:outline-none text-gray-700 cursor-pointer"
                              onClick={handleClose}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                        <div className="w-full p-4">
                          {loadingProfile ? (
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
                              <div className="w-full items-center justify-center">
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
                            </>
                          )}
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
        ) : (
          <></>
        )}
        {openPass ? (
          <>
            <Transition appear show={openPass} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={handleClose}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                        <div className="w-full h-10 p-4 bg-gray-200 flex items-center">
                          <div className="w-6/12">
                            <Dialog.Title
                              as="h3"
                              className="text-sm font-medium antialiased leading-6 text-green-700 "
                            >
                              Admin Password Update
                            </Dialog.Title>
                          </div>
                          <div className="w-6/12 flex justify-end text-right">
                            <button
                              className="focus:outline-none text-gray-700 cursor-pointer"
                              onClick={handleClose}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                        <div className="w-full p-4">
                          {loadingUpPass ? (
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
                              <div className="w-full items-center justify-center">
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
                            </>
                          )}
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
        ) : (
          <></>
        )}
        {openDel ? (
          <>
            <Transition appear show={openDel} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={handleClose}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                        <div className="w-full h-10 p-4 bg-gray-200 flex items-center">
                          <div className="w-6/12">
                            <Dialog.Title
                              as="h3"
                              className="text-sm font-medium antialiased leading-6 text-green-700 "
                            >
                              Delete Admin User
                            </Dialog.Title>
                          </div>
                          <div className="w-6/12 flex justify-end text-right">
                            <button
                              className="focus:outline-none text-gray-700 cursor-pointer"
                              onClick={handleClose}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                        <div className="w-full p-4">
                          {loadingUpDel ? (
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
                              <div className="w-full flex m-auto items-center justify-center gap-1">
                                <div className="w-3/12 mb-2 mt-2 sm:h-6 lg:h-9">
                                  <button
                                    className="w-full sm:h-6 lg:h-9 bg-green-600 hover:bg-green-700 hover:text-white text-white lg:py-1 px-1 lg:px-2 rounded flex items-center justify-center text-right focus:outline-none"
                                    onClick={() => submitUserDelete(userDelID)}
                                  >
                                    Yes Delete
                                  </button>
                                </div>
                                <div className="w-3/12 mb-2 mt-2 sm:h-6 lg:h-9">
                                  <button
                                    className="w-full sm:h-6 lg:h-9 bg-red-600 hover:bg-red-700 hover:text-white text-white lg:py-1 px-1 lg:px-2 rounded flex items-center justify-center text-right focus:outline-none"
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AdminList;
