import React, { useEffect, useState } from "react";
import { baseUrl } from "../config/config";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import { Spinner } from "flowbite-react";

interface ActivityCancelledProps {
    cancelled?: boolean;
    activityId?: number;
}

const ActivityCancelled: React.FC<ActivityCancelledProps> = (props: ActivityCancelledProps) => {

    const [cancel, setCancel] = useState<string | any>();
    const [activityId, setActivityId] = useState<number | any>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setCancel(props.cancelled);
        setActivityId(props.activityId);
        setLoading(false)
    }, []);

    const handleStatus = async (cancel: boolean, activityId: number) => {
        setLoading(true)
        const res = await fetch(`${baseUrl}/api/activity/activityUpdate?cancel=${cancel}&activityId=${activityId}`);
        const data = await res.json();
        console.log('Active:', data);
        setCancel(data.cancel);
        setLoading(false);
    };

    return (
        <>
            {
                loading ?
                    <>
                        <div className="w-full mt-2 sm:h-6 lg:h-9 flex place-items-center items-center justify-center text-center">
                            <Spinner />
                        </div>
                    </> :
                    <>
                        {console.log(cancel)}
                        {
                            cancel ?
                                <>
                                    <button
                                        className="w-22 mt-2 sm:h-6 lg:h-9 bg-gray-700 hover:bg-gray-800 hover:text-white text-white lg:py-1 px-1 lg:px-2 rounded flex items-center justify-center text-right focus:outline-none"
                                    >Cancelled
                                    </button>
                                </>
                                :
                                <>
                                    <button
                                        className="w-22 mt-2 sm:h-6 lg:h-9 bg-gray-800 hover:bg-gray-900 hover:text-white text-white lg:py-1 px-1 lg:px-2 rounded flex items-center justify-center text-right focus:outline-none"
                                        onClick={() => handleStatus(true, activityId)}
                                    >
                                        <FaTimes className="mr-3 ml-1 sm:mr-1 text-xs lg:text-base font-thin lg:font-semibold" />
                                        <span className="flex cursor-pointer capitalize  text-right text-xs lg:text-sm font-semibold subpixel-antialiased"
                                        >
                                            Cancel
                                        </span>
                                    </button>
                                </>
                        }
                    </>
            }
        </>
    );
};

export default ActivityCancelled;
