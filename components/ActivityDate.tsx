import React, { useEffect, useState } from "react";
import { baseUrl } from "../config/config";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import moment from "moment";

interface ActivityDateProps {
  date?: number;
}

const ActivityDate: React.FC<ActivityDateProps> = (
  props: ActivityDateProps
) => {
  const [date, setDate] = useState<number | any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setDate(props?.date);
    setLoading(false);
  }, []);

  return (
    <>{moment.unix(parseInt(date) / 1000).format("MMMM Do YYYY, h:mm:ss a")}</>
  );
};

export default ActivityDate;
