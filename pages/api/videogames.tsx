import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const pageParam = (req.query.page) ? `&page=${req.query.page}` : '';
        const sortParam = (req.query.ordering) ? `&ordering=${req.query.ordering}` : '';
        const metacriticParam = (req.query.metacritic) ? `&metacritic=${req.query.metacritic}` : '';
        const apiKey = process.env.RAWG_API_KEY || '';
        const params = `key=${apiKey}${pageParam}${sortParam}${metacriticParam}`
        const gamesReq = await fetch(`https://api.rawg.io/api/games?${params}`,
                {
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