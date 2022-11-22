import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const pageValue = req.query.page;
        const pageParam = (pageValue) ? `page=${pageValue}` : '';
        const apiKey = process.env.RAWG_API_KEY || '';
        const gamesReq = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&${pageParam}`, {
            next: {
                revalidate: 60 * 60 * 24
            }
        });
        const data = await gamesReq.json();
        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        return null;
    }
}