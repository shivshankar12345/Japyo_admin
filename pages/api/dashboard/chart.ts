import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        try {

            let startDate = `${req.query.d1}`, endDate = `${req.query.d2}`;

            let date1 = new Date(startDate);
            let date2 = new Date(endDate);
            let In_Time = date2.getTime() - date1.getTime();
            let In_Days = (In_Time / (1000 * 3600 * 24) + 1);
            let userList: any[] = [];
            for (let i = 0; i < In_Days; i++) {

                let result = new Date(startDate);
                result.setDate(result.getDate() + i);
                let newDate = new Date(result);
                const barDate = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
                const userjn = await dbConnect.select("*").from("jp_base_user").where('date_at', barDate);
                userjn.forEach((user) => {
                    userList.push(user)
                })
            }

            // console.log('userList :-', userList);

            const barCount = [];
            const barxAxis = [];

            for (let i = 0; i < In_Days; i++) {
                let result = new Date(startDate);
                result.setDate(result.getDate() + i);
                let newDate = new Date(result);
                const barDate = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
                const filteredData = userList.filter(function (obj) {
                    return obj.date_at === barDate;
                });
                barCount.push(`${filteredData.length}`);
            }

            for (let i = 0; i < In_Days; i++) {
                let result = new Date(startDate);
                result.setDate(result.getDate() + i);
                let newDate = new Date(result);
                const FullDate = new Date(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`).toDateString();
                barxAxis.push(`${FullDate}`);
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
                    data: barxAxis,
                },
                yAxis: {},
                series: [
                    {
                        name: "User Joining",
                        type: "bar",
                        data: barCount,
                    },
                ],
            };

            res.status(201).json({
                status: true,
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
