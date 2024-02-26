import React from "react";
interface TotalProps {
  activity?: string;
  loading?: boolean;
}

/**
 * An input element
 */
const Activity: React.FC<TotalProps> = (props: TotalProps) => {
  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const { activity } = props;

  return (
    <div className="flex bg-gray-50 py-3 px-5 dark:bg-gray-600 rounded-md shadow-md">
      <div className="w-4/12 content-center ">
        <div className="w-24 h-24 border border-gray-100 p-4 rounded-full shadow-lg">
          <img
            src={`${baseUrl}/assets/img/icon/activity.png`}
            alt="Total Users"
          />
        </div>
      </div>
      <div className="w-8/12 flex items-center justify-center">
        <div className="w-full">
          <div className="w-full p-2 text-center">
            <span className="text-lg font-semibold font-mono subpixel-antialiased">
              Activity : {activity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
