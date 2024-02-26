// @ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbConnect";

type ResponseData = {
  error: string;
  message: string;
};

type User = {
  [x: string]: any;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  profile_picture: string;
  account_status: string;
  account_type: string;
};

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const JWTSECRET: any = process.env.JWT_SECRET;

  if (req.method === "POST") {
    try {
      const body = req.body;
      const { first_name, last_name, phone_number, email, password } = body.newUser;


      const user = await dbConnect.select("*").from("jp_admin_user").where({ email });


      if (user == '') {
      } else {
        return res.status(422).json({ status: false, error: "User already exists" });
      }

      const HashedPassword = await bcrypt.hash(password, 12);

      const insert = await dbConnect("jp_admin_user").insert({ first_name: first_name, last_name: last_name, phone_number: phone_number, email: email, password: HashedPassword, profile_picture: '', account_status: 'active', account_type: 'admin' });

      if (insert) {
        return res.status(200).json({ status: true, message: "User Add Sucssefuly" });
      }

    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  } else {
    res.status(405).json({ messagge: "Method not allowed" });
  }
}
