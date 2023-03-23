import { NextApiRequest, NextApiResponse } from "next";


function cleanData(data: any) {
    if (data.next) {
        const cleanNextUrl = new URL(data.next);
        cleanNextUrl.searchParams.delete('key')
        data.next = cleanNextUrl.toString();
    }

    if (data.previous) {
        const cleanPreviousUrl = new URL(data.previous);
        cleanPreviousUrl.searchParams.delete('key');
        data.previous = cleanPreviousUrl.toString();
    }

    return data;
}

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
        const cleanedData = cleanData(data)
        res.status(200).json(cleanedData);
    } catch (e) {
        console.error(e);
        return null;
    }
}