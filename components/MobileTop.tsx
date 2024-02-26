import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useTheme } from "next-themes";
import { Transition } from "@headlessui/react";
import { baseUrl } from "../config/config";
import Layout from "../components/Layout";
import { FaHome, FaList, FaFacebookMessenger } from "react-icons/fa";

import { Navbar, Pagination, Table, Tabs } from "flowbite-react";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

interface Mobile {
  title?: string;
}

/**
 * An input element
 */
const MobileTop: React.FC<Mobile> = (props: Mobile) => {
  const { title } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Allow to use the `esc` key
  useEffect(() => {
    function handleEscape(event: { key: string }) {
      if (!mobileOpen) return;

      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }

    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [mobileOpen]);

  const renderThemeMode = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button className="mr-4">
          <BsFillSunFill
            className="w-7 h-7 text-yellow-200"
            role="button"
            onClick={() => setTheme("light")}
          />
        </button>
      );
    } else {
      return (
        <button className="mr-4">
          <BsMoonStarsFill
            className="w-7 h-7 text-gray-200 "
            role="button"
            onClick={() => setTheme("dark")}
          />
        </button>
      );
    }
  };

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", url: "/", src: "Chart_fill" },
    { title: "Users", url: "/users", src: "User" },
    { title: "Activity List", url: "/activity-list", src: "activity" },
    { title: "Report List", url: "/report-list", src: "report" },
    { title: "Block List", url: "/block-list", src: "block" },
    // { title: "Support", url: "/support", src: "Chat" },
    { title: "Setting", url: "/setting", src: "Setting" },
    { title: "Logout", url: "/logout", src: "logout", gap: true },
  ];

  return (
    <div className="w-full block xs:hidden  top-0">
      <div className="block xs:hidden bg-opacity-30  firefox:bg-opacity-30 opacity-100 dark:opacity-95 dark:bg-opacity-50 dark:backdrop-blur dark:backdrop-filter">
        <div className="w-full flex bg-dark-purple h-14 items-center">
          <div className="w-6/12">
            <div className="w-full ml-2 flex gap-x-4 items-center">
              <img
                src="./assets/img/logo.svg"
                className="cursor-pointer duration-500 z-20"
                style={{ width: "40px", height: "40px" }}
              />
              <h1 className="text-white origin-left font-medium text-xl duration-200">
                Japyo
              </h1>
            </div>
          </div>
          <div className="w-6/12 flex items-center justify-end">
            <button
              onClick={() => setMobileOpen(true)}
              type="button"
              className="mr-4"
            >
              {!mobileOpen ? (
                <svg
                  className="block h-10 w-10 mt-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 32 32"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-10 w-10 mt-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 32 32"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
            {renderThemeMode()}
            <button
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded text-sm p-1.5 text-center mr-4"
            >
              <span className="font-sans">{title}</span>
            </button>

            <Link
              href={`/`}
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full text-sm p-2 text-center mr-2"
            >
              <FaHome className="w-6 h-6 text-white dark:text-white" />
            </Link>
          </div>
        </div>
      </div>

      <Transition show={mobileOpen} className="absolute inset-0 z-40 flex">
        {/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
        <div className="fixed inset-0 z-40 overflow-hidden lg:hidden">
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur backdrop-filter opacity-100"
          >
            {(ref) => (
              <div ref={ref} className="absolute inset-0">
                <div
                  onClick={() => setMobileOpen(false)}
                  className="absolute inset-0 opacity-75 bg-cool-gray-600"
                />
              </div>
            )}
          </Transition.Child>
          {/* Off-canvas menu, show/hide based on off-canvas menu state. */}
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="h-screen relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 border-r border-white border-opacity-10 bg-gray-900 bg-opacity-75 backdrop-blur backdrop-filter firefox:bg-opacity-90"
          >
            <div className="absolute top-0 right-0 p-1 -mr-14">
              <Transition.Child
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-cool-gray-600"
                aria-label="Close sidebar"
                as="button"
                onClick={() => setMobileOpen(false)}
              >
                <svg
                  className="w-6 h-6 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Transition.Child>
            </div>
            <div className="flex items-center flex-shrink-0 px-4 z-50">
              <ul className="w-full height-85vh scrollbar-none scrollbar-rounded overflow-y-auto">
                {Menus.map((Menu, index) => (
                  <li
                    key={index}
                    className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white 
                      ${Menu.gap ? "mt-9" : "mt-2"} ${
                      index === 0 && "bg-light-white"
                    } `}
                  >
                    <Link
                      href={Menu.url}
                      className="w-full flex text-gray-300 text-sm items-center gap-x-4"
                    >
                      <img src={`./assets/img/${Menu.src}.png`} />
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        {Menu.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </div>
  );
};

export default MobileTop;
