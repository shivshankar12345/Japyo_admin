import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { Transition } from "@headlessui/react";
import TecRegionLogo from "../public/logo.svg";
import {
  BsBoxArrowInRight,
  BsFillSunFill,
  BsMoonStarsFill,
} from "react-icons/bs";

export default function LeftSidebar() {
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
    <div
      className={` ${
        open ? "w-60" : "w-14 "
      } hidden xs:block h-screen bg-dark-purple p-2  z-20 sticky top-0`}
    >
      <img
        src="./assets/img/control.png"
        className={`absolute cursor-pointer -right-6 top-4 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="w-full flex gap-x-4 items-center">
        <img
          src="./assets/img/logo.svg"
          className={`cursor-pointer duration-500 z-50 ${
            open && "rotate-[360deg]"
          }`}
          style={{ width: "40px", height: "40px" }}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Japyo
        </h1>
      </div>
      <ul className="w-full pt-6 height-85vh scrollbar-none scrollbar-rounded overflow-y-auto">
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
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
