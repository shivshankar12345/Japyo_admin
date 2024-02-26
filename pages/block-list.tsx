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
import UserProfile from "../components/UserProfile";

export async function getServerSideProps(context: any) {
  const res = await fetch(`${baseUrl}/api/block/blockList?page=1`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}

const BlockList = (data: any) => {
  // console.log(data.data);
  const newdata = data.data;

  console.log("newdata");
  console.log(newdata);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blockList, setBlockList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setCurrentPage(newdata.currentPage);
    setTotalPages(newdata.totalPages);
    setBlockList(newdata.blocks);
    setLoading(false);
  }, []);

  const users = JSON.stringify({ newdata });
  // const newuser = JSON.parse(newdata.blocks);

  const ulist = [];
  ulist.push(newdata.blocks);

  const onPageChange = async (e: any) => {
    // console.log(e);

    setLoading(true);
    const res = await fetch(`${baseUrl}/api/block/blockList?page=${e}`);
    const data = await res.json();
    // console.log(data);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);
    setBlockList(data.users);
    setLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>Block List</title>
        <meta name="description" content="Jaypo Admin Block List" />
        <link rel="icon" href="/assets/img/logo.svg" />
      </Head>
      <div className="main scrollbar-none scrollbar-rounded overflow-y-auto">
        <MobileTop title="Block" />
        <div className="w-full p-2">
          <div className="breadCrumb">
            <Breadcrumb
              aria-label="Solid background breadcrumb"
              className="bg-gray-50 py-3 px-5 dark:bg-gray-900 shadow-md"
            >
              <Breadcrumb.Item href="/" icon={FaThLarge}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/block-list">Block List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="content">
            <div className="content-body">
              <Tabs.Group aria-label="Tabs with icons" style="underline">
                <Tabs.Item active={true} title="Block List" icon={FaList}>
                  {loading ? (
                    <>
                      <Skeleton className="h-12" count={10} />
                    </>
                  ) : (
                    <>
                      <Table hoverable={true}>
                        <Table.Head className="bg-gray-700 border-gray-700  dark:border-gray-700 dark:bg-gray-800">
                          <Table.HeadCell>Reason</Table.HeadCell>
                          <Table.HeadCell>Blocker User</Table.HeadCell>
                          <Table.HeadCell>Blocked User</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {blockList.map((block: any) => (
                            <>
                              {/* {console.log(user)} */}
                              <Table.Row
                                key={block.user_idr}
                                id={block.user_id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                              >
                                <Table.Cell>{block.reason}</Table.Cell>
                                <Table.Cell>
                                  <UserProfile userId={block.blocker_user_id} />
                                </Table.Cell>
                                <Table.Cell>
                                  <UserProfile userId={block.blocked_user_id} />
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

export default BlockList;
