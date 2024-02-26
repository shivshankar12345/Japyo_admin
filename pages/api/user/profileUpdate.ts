import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { user_id, first_name, last_name, phone_number, email, account_status, account_type } = req.body.user;
        const user = await dbConnect.raw(`update jp_admin_user set first_name = '${first_name}' , last_name = '${last_name}' , phone_number = '${phone_number}' , email = '${email}' , account_status = '${account_status}' , account_type = '${account_type}' where user_id = '${user_id}'`);

        const Adminuser = await dbConnect.select("*").from("jp_admin_user").where({ email });

        res.status(201).json({
            status: true,
            user: Adminuser[0],
            message: "Update successful!!!",
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
