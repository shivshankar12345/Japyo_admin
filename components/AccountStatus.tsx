import React, { useEffect, useState } from "react";
import { baseUrl } from "../config/config";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import { Spinner } from "flowbite-react";
interface AccountStatusProps {
    status?: string;
    userId?: number;
}

const AccountStatus: React.FC<AccountStatusProps> = (props: AccountStatusProps) => {

    const [status, setStatus] = useState<string | any>();
    const [userId, setUserId] = useState<number | any>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setStatus(props?.status);
        setUserId(props?.userId);
        setLoading(false)
    }, []);

    const handleStatus = async (status: string, user_id: number) => {
        setLoading(true)
        const res = await fetch(`${baseUrl}/api/user/userUpdate?status=${status}&uid=${user_id}`);
        const data = await res.json();
        console.log('Active:', data);
        setStatus(data?.statu);
        setLoading(false);
    };


    return (
        <>
            {
                loading ?
                    <>
                        <div className="w-full mt-2 sm:h-6 lg:h-9 flex place-items-center items-center justify-center text-center">
                            <Spinner
                                aria-label="Extra large spinner example"
                            />
                        </div>
                    </> :
                    <>
                        {
                            status == 'active' ?
                                <>
                                    <button
                                        className="w-22 mt-2 sm:h-6 lg:h-9 bg-red-600 hover:bg-red-700 hover:text-white text-white lg:py-1 px-1 lg:px-2 rounded flex items-center justify-center text-right focus:outline-none"
                                        onClick={() => handleStatus('deactive', userId)}
                                    >
                                        <FaTimes className="mr-3 ml-1 sm:mr-1 text-xs lg:text-base font-thin lg:font-semibold" />
                                        <span className="flex cursor-pointer capitalize  text-right text-xs lg:text-sm font-semibold subpixel-antialiased">
                                            Deactivate
                                        </span>
                                    </button>
                                </>
                                :
                                <>
                                    <button
                                        className="w-22 mt-2 sm:h-6 lg:h-9 bg-green-600 hover:bg-green-700 hover:text-white text-white lg:py-1 px-1 lg:px-2 rounded flex items-center justify-center text-right focus:outline-none"
                                        onClick={() => handleStatus('active', userId)}
                                    >
                                        <FaCheck className="mr-3 ml-1 sm:mr-1 text-xs lg:text-base font-thin lg:font-semibold" />
                                        <span className="flex cursor-pointer capitalize  text-right text-xs lg:text-sm font-semibold subpixel-antialiased"
                                        >
                                            active
                                        </span>
                                    </button>
                                </>
                        }
                    </>
            }

        </>
    );
};

export default AccountStatus;
