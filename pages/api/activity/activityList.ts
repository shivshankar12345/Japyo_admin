import { NextApiRequest, NextApiResponse } from "next";
import absoluteUrl from "next-absolute-url"
import { APIUrl } from "../../../config/config";
import dbConnect from "../../../lib/dbConnect";

type ResponseData = {
    error: string,
    message: string,
    page: number,
    startFrom: number,
    perPage: number,
}

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        try {
            const perPage = 10;
            const page: any = req.query.page;
            const startFrom = (page - 1) * perPage;

            const totalActivity = await dbConnect.select("*").from("jp_activity");
            const totalRecords = totalActivity.length;
            const activityList = await dbConnect.raw(`SELECT * FROM jp_activity ORDER BY activity_id DESC OFFSET ${startFrom} LIMIT ${10}`);
            const totalPages = Math.ceil(totalRecords / perPage);

            res.status(201).json({
                status: true,
                activity: activityList.rows,
                currentPage: page,
                totalPages: totalPages,
            })
        } catch (err) {
            console.log(err)
            res.status(500).send("error")
        }
    } else {
        res.status(405).json({ messagge: "Method not allowed" })
    }

}
