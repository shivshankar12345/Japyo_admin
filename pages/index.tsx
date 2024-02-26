import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { baseUrl } from "../config/config";
import Layout from "../components/Layout";
import { Breadcrumb } from "flowbite-react";
import TotalUser from "../components/TotalUser";
import BlockUser from "../components/BlockUser";
import Activity from "../components/Activity";
import MobileTop from "../components/MobileTop";
import {
  FaHome,
  FaList,
  FaTh,
  FaThLarge,
  FaFacebookMessenger,
} from "react-icons/fa";
import Bar from "../components/Bar";

export async function getServerSideProps(context: any) {
  const res = await fetch(`${baseUrl}/api/dashboard`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}

const IndexPage = (data: any) => {
  // console.log(data.data);
  const dashData = data.data;
  const { users, activityCount, chartData } = dashData;

  const [loading, setLoading] = useState(false);
  const [totalUser, setTotalUser] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [inactiveUser, setInactiveUser] = useState("");
  const [blockUser, setBlockUser] = useState("");
  const [activity, setActivity] = useState("");

  useEffect(() => {
    setLoading(true);
    setTotalUser(users.totalUser);
    setActiveUser(users.activeUser);
    setInactiveUser(users.inactiveUser);
    setBlockUser(users.blockUser);
    setActivity(activityCount);
    setLoading(false);
  });
  return (
    <Layout>
      <Head>
        <title>Jaypo Admin Dashboard</title>
        <meta name="description" content="Jaypo Admin Dashboard" />
        <link rel="icon" href="/assets/img/logo.svg" />
      </Head>
      <div className="main scrollbar-none scrollbar-rounded overflow-y-auto">
        <MobileTop title="Home" />
        <div className="w-full p-2">
          <div className="breadCrumb">
            <Breadcrumb
              aria-label="Solid background breadcrumb"
              className="bg-gray-50 dark:text-white py-3 px-5 dark:bg-gray-500 shadow-md"
            >
              <Breadcrumb.Item
                href="/"
                icon={FaThLarge}
                className="dark:text-white"
              >
                Dashboard
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="content">
            <div className="w-full dark:bg-gray-900 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <TotalUser
                  total={totalUser}
                  active={activeUser}
                  inactive={inactiveUser}
                  loading={loading}
                />
                <BlockUser block={blockUser} loading={loading} />
                <Activity activity={activity} loading={loading} />
              </div>
              <div className="w-full mt-2 mb-2">
                <Bar chartData={chartData} />
              </div>
              <div className="w-full p-2"></div>
              <div className="w-full p-2"></div>
              <div className="w-full p-2"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
