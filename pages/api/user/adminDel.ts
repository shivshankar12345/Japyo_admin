import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { user_id } = req.body;
        const userDel = await dbConnect.select("*").from("jp_admin_user").where('user_id', user_id).del();
        res.status(201).json({
            status: true,
            userDel: userDel,
            message: "User delete successful...",
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
