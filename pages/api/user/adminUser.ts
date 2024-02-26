import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user_id = req.query.id;
        const user = await dbConnect.select("*").from("jp_admin_user").where('user_id', user_id);
        // console.log('user :-', user);
        res.status(201).json({
            status: true,
            user: user[0],
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
