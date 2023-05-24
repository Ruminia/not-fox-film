import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET'){
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res);

        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}

//if done have or something wrong with this file, the loggin with with
//fuking create new account table for previus user still alive cookie  sql not on user table
//and the fucking profile on home page can't get name or email, yes it blank.