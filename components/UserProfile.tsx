import React, { Fragment, useEffect, useState } from "react";
import { baseUrl } from "../config/config";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import moment from "moment";
import { Dialog, Transition } from "@headlessui/react";

interface ActivityDateProps {
  userId?: number;
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

const UserProfile: React.FC<ActivityDateProps> = (props: ActivityDateProps) => {
  const [date, setDate] = useState<number | any>();
  const [loading, setLoading] = useState(false);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [user, setUser] = useState<UserProfile | any>([]);

  const UserProfile = async (user_id: any) => {
    const res = await fetch(`${baseUrl}/api/user/${user_id}`);
    const data = await res.json();
    setUser(data.user);
  };

  useEffect(() => {
    setLoading(true);
    setDate(props?.userId);
    UserProfile(props?.userId);
    setLoading(false);
  }, []);

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
    <>
      {loading ? (
        <>
          <Spinner color="pink" aria-label="Pink spinner example" />
        </>
      ) : (
        <>
          <span
            className="cursor-pointer"
            onClick={() => UserProfileHandler(user.user_id)}
          >
            {user.profile_name}
          </span>
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
                                            <h6 className="w-full">Follower</h6>
                                            <span className="w-full text-pink-500">
                                              {user.follower_count}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="w-4/12 p-2 flex place-items-center items-center justify-center text-center">
                                          <div className="w-full p-1">
                                            <h6 className="w-full">Met IRL</h6>
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
        </>
      )}
    </>
  );
};

export default UserProfile;
