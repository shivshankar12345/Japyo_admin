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

    try {
        let status = req.query.status;
        let user_id = req.query.uid;

        const user = await dbConnect.raw('update jp_base_user set account_status = ? where user_id = ?', [status, user_id]);

        res.status(201).json({
            status: true,
            user: user,
            statu: status,
            user_id: user_id,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }

}
