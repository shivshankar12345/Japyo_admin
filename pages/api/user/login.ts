import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "../../../lib/dbConnect";

type ResponseData = {
  error: string,
  message: string,
}

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {

  const JWTSECRET: any = process.env.JWT_SECRET

  if (req.method === "POST") {
    try {

      const body = JSON.parse(req.body)

      const { email, password } = body;

      if (!email || !password) {
        return res.status(422).json({ status: false, error: "Please as all the fields" })
      }

      const user = await dbConnect.select("*").from("jp_admin_user").where({ email });
      // console.log('user', user[0]);

      if (!user[0]) {
        return res.status(404).json({ status: false, error: "User don't exists" });
      }

      const doMatch = await bcrypt.compare(password, user[0].password)

      if (doMatch) {
        const token = jwt.sign({ userId: user[0].user_id }, JWTSECRET, {
          expiresIn: "30d",
        })

        const { user_id, first_name, last_name, email, phone_number, profile_picture, account_status, account_type } = user[0];

        res.status(201).json({
          status: true,
          token,
          user: { user_id, first_name, last_name, email, phone_number, profile_picture, account_status, account_type },
          message: "login successful",
        })
      } else {
        return res.status(401).json({ status: false, error: "User info does not match, Please enter correct info" })
      }

    } catch (err) {
      console.log(err)
      res.status(500).send("error")
    }
  } else {
    res.status(405).json({ messagge: "Method not allowed" })
  }

}
