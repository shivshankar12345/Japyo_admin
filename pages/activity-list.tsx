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
import ActivityDate from "../components/ActivityDate";
import ActivityCancelled from "../components/ActivityCancelled";

export async function getServerSideProps(context: any) {
  const res = await fetch(`${baseUrl}/api/activity/activityList?page=1`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}

const ActivityList = (data: any) => {
  // console.log(data.data);
  const newdata = data.data;

  // console.log("newdata");
  // console.log(newdata);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activityList, setActivityList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setCurrentPage(newdata.currentPage);
    setTotalPages(newdata.totalPages);
    setActivityList(newdata.activity);
    setLoading(false);
  }, []);

  const users = JSON.stringify({ newdata });
  // const newuser = JSON.parse(newdata.activity);

  const ulist = [];
  ulist.push(newdata.activity);
  const onPageChange = async (e: any) => {
    // console.log(e);

    setLoading(true);
    const res = await fetch(`${baseUrl}/api/activity/activityList?page=${e}`);
    const data = await res.json();
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);
    setActivityList(data.activity);
    setLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>Activity List</title>
        <meta name="description" content="Jaypo Admin Activity List" />
        <link rel="icon" href="/assets/img/logo.svg" />
      </Head>
      <div className="main scrollbar-none scrollbar-rounded overflow-y-auto">
        <MobileTop title="Activity" />
        <div className="w-full p-2">
          <div className="breadCrumb">
            <Breadcrumb
              aria-label="Solid background breadcrumb"
              className="bg-gray-50 py-3 px-5 dark:bg-gray-900 shadow-md"
            >
              <Breadcrumb.Item href="/" icon={FaThLarge}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/activity-list">
                Activity List
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="content">
            <div className="content-body">
              <Tabs.Group aria-label="Tabs with icons" style="underline">
                <Tabs.Item active={true} title="Activity List" icon={FaList}>
                  {loading ? (
                    <>
                      <Skeleton className="h-12" count={10} />
                    </>
                  ) : (
                    <>
                      <Table hoverable={true}>
                        <Table.Head className="bg-gray-700 border-gray-700  dark:border-gray-700 dark:bg-gray-800">
                          <Table.HeadCell>Title</Table.HeadCell>
                          <Table.HeadCell>Start</Table.HeadCell>
                          <Table.HeadCell>End</Table.HeadCell>
                          <Table.HeadCell>Place</Table.HeadCell>
                          <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {activityList.map((activity: any) => (
                            <>
                              {/* {console.log(user)} */}
                              <Table.Row
                                key={activity.activity_id}
                                id={activity.activity_id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                              >
                                <Table.Cell>{activity.title}</Table.Cell>
                                <Table.Cell>
                                  <ActivityDate date={activity.time_start} />
                                </Table.Cell>
                                <Table.Cell>
                                  <ActivityDate date={activity.time_end} />
                                </Table.Cell>
                                <Table.Cell>{activity.place}</Table.Cell>
                                <Table.Cell>
                                  <ActivityCancelled
                                    cancelled={activity.is_cancelled}
                                    activityId={activity.activity_id}
                                  />
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
        </div>
      </div>
    </Layout>
  );
};

export default ActivityList;
