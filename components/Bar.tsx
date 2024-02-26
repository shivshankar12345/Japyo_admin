import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useTheme } from "next-themes";
import { Transition } from "@headlessui/react";
import { baseUrl } from "../config/config";
import Layout from "./Layout";
import { FaHome, FaList, FaFacebookMessenger } from "react-icons/fa";

import { Navbar, Pagination, Spinner, Table, Tabs } from "flowbite-react";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

import ReactECharts from "echarts-for-react";
import DatePicker from "react-datepicker";

interface BarProps {
  chartData?: any;
}

const Bar: React.FC<BarProps> = (props: BarProps) => {
  const { chartData } = props;
  const [option, setOption] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setOption(chartData);
    setLoading(false);
  }, []);

  const date01 = new Date();
  const days = 86400000;
  const date07 = new Date(date01.getTime() - 6 * days);

  const barDate01 = `${date01.getFullYear()}/${
    date01.getMonth() + 1
  }/${date01.getDate()}`;
  const barDate07 = `${date07.getFullYear()}/${
    date07.getMonth() + 1
  }/${date07.getDate()}`;

  const [startDate, setStartDate] = useState(new Date(barDate07));
  const [endDate, setEndDate] = useState(new Date(barDate01));

  const filterHandel = async () => {
    setLoading(true);
    const res = await fetch(
      `${baseUrl}/api/dashboard/chart?d1=${startDate}&d2=${endDate}`
    );
    const data = await res.json();
    setOption(data.chartData);
    setLoading(false);

    // console.log("data :-", data.chartData);
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-600 border rounded-md shadow-md">
      <div className="w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 flex justify-end ">
        <div className="w-full sm:w-7/12 p-4 flex items-center justify-end">
          <div className="w-2/12 sm:w-6/12 text-start sm:text-end items-center">
            {/* <span className="p-2 text-start sm:text-end text-black rounded-md group-hover:bg-opacity-0">
              Date Filter
            </span> */}
          </div>
          <div className="w-2/12 sm:w-4/12 flex justify-end hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date: any) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
          <div className="w-2/12 flex justify-end">
            <button
              type="button"
              className="W-12 sm:w-26 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 ml-3 mt-1 sm:mt-0 sm:ml-0 sm:px-5 sm:py-2.5 sm:mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => filterHandel()}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-50 py-3 px-5">
        {loading ? (
          <>
            <div className="w-full h-80 flex place-items-center items-center justify-center text-center">
              <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
          </>
        ) : (
          <>
            <ReactECharts
              option={option}
              style={{ height: 400 }}
              opts={{ renderer: "svg" }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Bar;
