import { FormEvent, Key, useEffect, useState } from "react";
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
} from "react-icons/fa";

import { Breadcrumb, Navbar, Pagination, Table, Tabs } from "flowbite-react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MobileTop from "../components/MobileTop";

const Support = () => {
  return (
    <Layout>
      <Head>
        <title>Support</title>
        <meta name="description" content="Jaypo Admin Support" />
        <link rel="icon" href="/assets/img/logo.svg" />
      </Head>
      <div className="main scrollbar-none scrollbar-rounded overflow-y-auto">
        <MobileTop title="Support" />
        <div className="w-full p-2">
          <div className="breadCrumb">
            <Breadcrumb
              aria-label="Solid background breadcrumb"
              className="bg-gray-50 py-3 px-5 dark:bg-gray-900 shadow-md"
            >
              <Breadcrumb.Item href="/" icon={FaThLarge}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/support">Support List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="content">
            <div className="content-body"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
