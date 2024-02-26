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
        let cancel = req.query.cancel;
        let activityID = req.query.activityId;

        const activity = await dbConnect.raw('update jp_activity set is_cancelled = ? where activity_id = ?', [cancel, activityID]);

        res.status(201).json({
            status: true,
            activity: activity,
            cancel: cancel,
            activityID: activityID,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }

}
