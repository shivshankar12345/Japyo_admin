import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbConnect";

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { user_id, password } = req.body.userPass;
        const HashedPassword = await bcrypt.hash(password, 12);
        const user = await dbConnect.raw('update jp_admin_user set password = ?  where user_id = ?', [HashedPassword, user_id]);
        res.status(201).json({
            status: true,
            user: user,
            message: "Password update successful...",
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}
