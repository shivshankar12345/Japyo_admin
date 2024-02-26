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
  const res = await fetch(`${baseUrl}/api/report/reportList?page=1`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}

const ReportList = (data: any) => {
  // console.log(data.data);
  const newdata = data.data;

  console.log("newdata");
  console.log(newdata);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reportList, setReportList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setCurrentPage(newdata.currentPage);
    setTotalPages(newdata.totalPages);
    setReportList(newdata.reports);
    setLoading(false);
  }, []);

  const users = JSON.stringify({ newdata });
  // const newuser = JSON.parse(newdata.reports);

  const ulist = [];
  ulist.push(newdata.reports);
  const onPageChange = async (e: any) => {
    // console.log(e);

    setLoading(true);
    const res = await fetch(`${baseUrl}/api/report/reportList?page=${e}`);
    const data = await res.json();
    // console.log(data);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);
    setReportList(data.users);
    setLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>Report List</title>
        <meta name="description" content="Jaypo Admin Report List" />
        <link rel="icon" href="/assets/img/logo.svg" />
      </Head>
      <div className="main scrollbar-none scrollbar-rounded overflow-y-auto">
        <MobileTop title="Report" />
        <div className="w-full p-2">
          <div className="breadCrumb">
            <Breadcrumb
              aria-label="Solid background breadcrumb"
              className="bg-gray-50 py-3 px-5 dark:bg-gray-900 shadow-md"
            >
              <Breadcrumb.Item href="/" icon={FaThLarge}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/report-list">Report List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="content">
            <div className="content-body">
              <Tabs.Group aria-label="Tabs with icons" style="underline">
                <Tabs.Item active={true} title="Rport List" icon={FaList}>
                  {loading ? (
                    <>
                      <Skeleton className="h-12" count={10} />
                    </>
                  ) : (
                    <>
                      <Table hoverable={true}>
                        <Table.Head className="bg-gray-700 border-gray-700  dark:border-gray-700 dark:bg-gray-800">
                          <Table.HeadCell>Reason</Table.HeadCell>
                          <Table.HeadCell>Reporter</Table.HeadCell>
                          <Table.HeadCell>Reported</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {reportList.map((report: any) => (
                            <>
                              {/* {console.log(user)} */}
                              <Table.Row
                                key={report.user_report_id}
                                id={report.user_report_id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                              >
                                <Table.Cell>{report.reason}</Table.Cell>
                                <Table.Cell>
                                  <UserProfile userId={report.reporter_id} />
                                </Table.Cell>
                                <Table.Cell>
                                  <UserProfile userId={report.reported_id} />
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

export default ReportList;
