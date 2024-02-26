import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import Head from "next/head";
import { baseUrl } from "../../config/config";
import Layout from "../../components/Layout";
import {
  FaHome,
  FaList,
  FaFacebookMessenger,
  FaThLarge,
  FaPlusCircle,
  FaTimes,
  FaEye,
  FaCheck,
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
import MobileTop from "../../components/MobileTop";
import AccountStatus from "../../components/AccountStatus";

export async function getServerSideProps(_context: any) {
  const res = await fetch(`${baseUrl}/api/user/userList?page=1`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}

interface UserProfile {
  user_id: string;
  username: string;
  account_status?: string;
  account_type: string;
  address: string;
  device_token: string;
  follower_count: string;
  following_count: string;
  irl_count: string;
  japyo_code: string;
  karma_point: string;
  phone_privacy: string;
  profile_description: string;
  profile_name: string;
  profile_picture: string;
  registration_completed: string;
  send_notification: string;
  show_recent: string;
  date_at: string;
}

const Users = (data: any) => {
  // console.log(data.data);
  const newdata = data.data;
  // console.log(baseUrl);
  // console.log("newdata");
  // console.log(newdata);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [user, setUser] = useState<UserProfile | any>([]);

  useEffect(() => {
    setLoading(true);
    setCurrentPage(newdata.currentPage);
    setTotalPages(newdata.totalPages);
    setUserList(newdata.users);
    setLoading(false);
  }, []);

  const users = JSON.stringify({ newdata });
  // const newuser = JSON.parse(newdata.users);

  const ulist = [];
  ulist.push(newdata.users);
  const onPageChange = async (e: any) => {
    setLoading(true);
    const res = await fetch(`${baseUrl}/api/user/userList?page=${e}`);
    const data = await res.json();
    // console.log(data);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);
    setUserList(data.users);
    setLoading(false);
  };

  const UserProfileHandler = async (user_id: any) => {
    setOpen(true);
    setLoadingProfile(true);
    const res = await fetch(`${baseUrl}/api/user/${user_id}`);
    const data = await res.json();
    setUser(data.user);
    setLoadingProfile(false);

    const ProfilePicture =
      data.user.profile_picture.match(/graph.facebook.com/g);

    if (!ProfilePicture) {
      setProfilePicture(
        `https://japyospc.fra1.digitaloceanspaces.com/media/profiles/${data.user.profile_picture}`
      );
    } else {
      setProfilePicture(data.user.profile_picture);
    }

    // console.log("data :- ", data.user);
    // console.log("ProfilePicture :- ", ProfilePicture);
  };
  const handleClose = () => setOpen(false);

  return (
    <Layout>
      <Head>
        <title>Users List</title>
        <meta name="description" content="Jaypo Admin User List" />
        <link rel="icon" href="/assets/img/logo.svg" />
      </Head>
      <div className="main scrollbar-none scrollbar-rounded overflow-y-auto">
        <MobileTop title="Users" />
        <div className="w-full p-2">
          <div className="breadCrumb">
            <Breadcrumb
              aria-label="Solid background breadcrumb"
              className="bg-gray-50 py-3 px-5 dark:bg-gray-900 shadow-md"
            >
              <Breadcrumb.Item href="/" icon={FaThLarge}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/users">Users List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="content">
            <div className="content-body">
              <Tabs.Group aria-label="Tabs with icons" style="underline">
                <Tabs.Item active={true} title="User List" icon={FaList}>
                  {loading ? (
                    <>
                      <Skeleton className="h-12" count={10} />
                    </>
                  ) : (
                    <>
                      <Table hoverable={true}>
                        <Table.Head className="bg-gray-700 border-gray-700  dark:border-gray-700 dark:bg-gray-800">
                          <Table.HeadCell>Profile Name</Table.HeadCell>
                          <Table.HeadCell>Username</Table.HeadCell>
                          <Table.HeadCell>Status</Table.HeadCell>
                          <Table.HeadCell>Type</Table.HeadCell>
                          <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {userList.map((user: any) => (
                            <>
                              {/* {console.log(user)} */}
                              <Table.Row
                                key={user.user_id}
                                id={user.user_id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                              >
                                <Table.Cell>{user.profile_name}</Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell className="capitalize">
                                  {user.account_status}
                                </Table.Cell>
                                <Table.Cell className="capitalize">
                                  {user.account_type}
                                </Table.Cell>
                                <Table.Cell className="flex gap-1">
                                  <div className="w-20 mt-2 sm:h-6 lg:h-9">
                                    <button
                                      className="w-20 mt-2 sm:h-6 lg:h-9 bg-blue-600 hover:bg-blue-700 hover:text-white text-white lg:py-1 px-1 lg:px-2 rounded flex items-center justify-center text-right focus:outline-none"
                                      onClick={() =>
                                        UserProfileHandler(user.user_id)
                                      }
                                    >
                                      <FaEye className="mr-3 ml-1 sm:mr-1 text-xs lg:text-base font-thin lg:font-semibold" />
                                      <span className="flex cursor-pointer text-right text-xs lg:text-sm font-semibold subpixel-antialiased">
                                        View
                                      </span>
                                    </button>
                                  </div>
                                  <div className="w-20 mt-2 sm:h-6 lg:h-9">
                                    <AccountStatus
                                      status={user.account_status}
                                      userId={user.user_id}
                                    />
                                  </div>
                                </Table.Cell>
                              </Table.Row>
                            </>
                          ))}
                        </Table.Body>
                      </Table>
                      <Pagination
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        showIcons={true}
                        totalPages={totalPages}
                        className="mt-6 mb-6"
                      />
                    </>
                  )}
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
          <div className="w-full">
            {open ? (
              <>
                <Transition appear show={open} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={handleClose}
                  >
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
                                  User Profile
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
                                    <div className="w-full h-24 flex place-items-center items-center justify-center text-center">
                                      <img
                                        src={profilePicture}
                                        className="w-24 h-24 rounded-full"
                                        alt=""
                                      />
                                    </div>
                                    <div className="w-full mt-2 items-center justify-center text-center">
                                      <h1 className="w-full text-xl subpixel-antialiased font-semibold font-mono items-center justify-center text-center">
                                        {user.profile_name}
                                      </h1>
                                      <h1 className="w-full text-sm subpixel-antialiased font-semibold font-mono items-center justify-center text-center">
                                        ---
                                      </h1>
                                      <h1 className="w-full text-sm subpixel-antialiased font-semibold font-mono items-center justify-center text-center">
                                        ---
                                      </h1>
                                      <h3 className="w-full mb-1 text-sm text-pink-500 subpixel-antialiased font-semibold font-mono items-center justify-center text-center">
                                        {user.karma_point} Karma Point
                                      </h3>
                                      <div className="w-full h-20 p-2 flex place-items-center items-center justify-center text-center">
                                        <div className="w-8/12 flex h-16 bg-gray-200 rounded-md">
                                          <div className="w-4/12 p-2 flex place-items-center items-center justify-center text-center">
                                            <div className="w-full p-1">
                                              <h6 className="w-full">
                                                Following
                                              </h6>
                                              <span className="w-full text-pink-500">
                                                {user.following_count}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="w-4/12 p-2 flex place-items-center items-center justify-center text-center">
                                            <div className="w-full p-1">
                                              <h6 className="w-full">
                                                Follower
                                              </h6>
                                              <span className="w-full text-pink-500">
                                                {user.follower_count}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="w-4/12 p-2 flex place-items-center items-center justify-center text-center">
                                            <div className="w-full p-1">
                                              <h6 className="w-full">
                                                Met IRL
                                              </h6>
                                              <span className="w-full text-pink-500">
                                                {user.irl_count}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
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
        </div>
      </div>
    </Layout>
  );
};

export default Users;
