import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";

type ResponseData = {
    error: string,
    message: string,
}

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {


    if (req.method === "GET") {
        try {
            const totalUser = await dbConnect.select("*").from("jp_base_user");
            const activeUser = await dbConnect.select("*").from("jp_base_user").where('account_status', 'active');
            const blockUser = await dbConnect.select("*").from("jp_user_block");
            const activity = await dbConnect.select("*").from("jp_activity");

            const date = new Date();
            const days = 86400000;
            const date01 = new Date(date.getTime() - 1 * days);
            const date02 = new Date(date.getTime() - 2 * days);
            const date03 = new Date(date.getTime() - 3 * days);
            const date04 = new Date(date.getTime() - 4 * days);
            const date05 = new Date(date.getTime() - 5 * days);
            const date06 = new Date(date.getTime() - 6 * days);

            const barDate01 = `${date06.getDate()}/${date06.getMonth() + 1}/${date06.getFullYear()}`;
            const barDate02 = `${date05.getDate()}/${date05.getMonth() + 1}/${date05.getFullYear()}`;
            const barDate03 = `${date04.getDate()}/${date04.getMonth() + 1}/${date04.getFullYear()}`;
            const barDate04 = `${date03.getDate()}/${date03.getMonth() + 1}/${date03.getFullYear()}`;
            const barDate05 = `${date02.getDate()}/${date02.getMonth() + 1}/${date02.getFullYear()}`;
            const barDate06 = `${date01.getDate()}/${date01.getMonth() + 1}/${date01.getFullYear()}`;
            const barDate07 = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

            const fulDate01 = new Date(`${date06.getFullYear()}-${date06.getMonth() + 1}-${date06.getDate()}`).toDateString();
            const fulDate02 = new Date(`${date05.getFullYear()}-${date05.getMonth() + 1}-${date05.getDate()}`).toDateString();
            const fulDate03 = new Date(`${date04.getFullYear()}-${date04.getMonth() + 1}-${date04.getDate()}`).toDateString();
            const fulDate04 = new Date(`${date03.getFullYear()}-${date03.getMonth() + 1}-${date03.getDate()}`).toDateString();
            const fulDate05 = new Date(`${date02.getFullYear()}-${date02.getMonth() + 1}-${date02.getDate()}`).toDateString();
            const fulDate06 = new Date(`${date01.getFullYear()}-${date01.getMonth() + 1}-${date01.getDate()}`).toDateString();
            const fulDate07 = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).toDateString();

            const userList = await dbConnect.select("*").from("jp_base_user")
                .where('date_at', barDate07)
                .orWhere('date_at', barDate06)
                .orWhere('date_at', barDate05)
                .orWhere('date_at', barDate04)
                .orWhere('date_at', barDate03)
                .orWhere('date_at', barDate02)
                .orWhere('date_at', barDate01);

            const dataFilter = (date: string) => {
                const filteredData = userList.filter(function (obj) {
                    return obj.date_at === date;
                });
                return filteredData.length;
            }

            const option = {
                title: {
                    text: "User Joining",
                },
                tooltip: {},
                legend: {
                    data: ["User Joining"],
                },
                xAxis: {
                    data: [`${fulDate01}`, `${fulDate02}`, `${fulDate03}`, `${fulDate04}`, `${fulDate05}`, `${fulDate06}`, `${fulDate07}`],
                },
                yAxis: {},
                series: [
                    {
                        name: "User Joining",
                        type: "bar",
                        data: [dataFilter(barDate01), dataFilter(barDate02), dataFilter(barDate03), dataFilter(barDate04), dataFilter(barDate05), dataFilter(barDate06), dataFilter(barDate07)],
                    },
                ],
            };

            res.status(201).json({
                status: true,
                users: {
                    totalUser: totalUser.length,
                    activeUser: activeUser.length,
                    inactiveUser: 0,
                    blockUser: blockUser.length,
                },
                activityCount: activity.length,
                chartData: option,
            })
        } catch (err) {
            // console.log(err)
            res.status(500).send("error")
        }
    } else {
        res.status(405).json({ messagge: "Method not allowed" })
    }

}
