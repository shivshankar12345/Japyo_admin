import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const Footer = (props: any) => {
  const base_url = "/";

  const router = useRouter();
  const onHome = () => {
    router.push(`/`);
  };

  // console.log(router)

  const todaysDate = new Date();
  const currentYear = todaysDate.getFullYear();

  return (
    <footer className="w-full hidden sm:block items-center py-1 px-1 mt-auto bg-gray-900 fixed bottom-0 inset-x-100">
      <div className="w-full hidden xs:block text-right ">
        <span className="text-gray-400 text-sm">
          © 2021 - {currentYear} Japyo. All rights reserved.
        </span>
      </div>

      <div className="w-full block xs:hidden fixed bottom-0 inset-x-0">
        <div className="block xs:hidden  bg-opacity-30  firefox:bg-opacity-30 opacity-100 dark:opacity-95 dark:bg-opacity-50 dark:backdrop-blur dark:backdrop-filter">
          <div className="bg-dark-purple h-14"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
