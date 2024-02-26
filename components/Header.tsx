import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import {
  BsBoxArrowInRight,
  BsFillSunFill,
  BsMoonStarsFill,
} from "react-icons/bs";

const Header = () => {
  const router = useRouter();

  const [showTop, setShow] = useState(false);
  const controlNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeMode = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button className="mr-8">
          <BsFillSunFill
            className="w-7 h-7 text-yellow-200"
            role="button"
            onClick={() => setTheme("light")}
          />
        </button>
      );
    } else {
      return (
        <button className="mr-8">
          <BsMoonStarsFill
            className="w-7 h-7 text-gray-200 "
            role="button"
            onClick={() => setTheme("dark")}
          />
        </button>
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <>
      <div className="w-full hidden xs:block sticky top-0">
        <div className="hidden xs:block lg:block fixtop bg-opacity-30  firefox:bg-opacity-30 opacity-100 dark:opacity-95 dark:bg-opacity-50 dark:backdrop-blur dark:backdrop-filter">
          <div className="bg-dark-purple flex items-center h-14">
            <div className="w-full flex items-center">
              <div className="w-5/12"></div>
              <div className="w-5/12"></div>
              <div className="w-2/12 flex items-center justify-end text-end">
                {renderThemeMode()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
