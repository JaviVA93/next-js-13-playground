import Image from 'next/image'
import GamesList from '../../components/GamesList';
import styles from '../../styles/videogamesPage.module.css';

interface GamesPage {
    next: string,
    previous: string,
    results: {
        "id": number,
        "slug": string,
        "name": string,
        "released": string, // "2022-11-21",
        "tba": boolean,
        "background_image": string, // "http://example.com",
        "rating": number,
        "rating_top": number,
        "ratings": {},
        "ratings_count": number,
        "reviews_text_count": string,
        "added": number,
        "added_by_status": {},
        "metacritic": number,
        "playtime": number,
        "suggestions_count": number,
        "updated": string,  // "2022-11-21T16:09:43Z",
        "esrb_rating": {
            "id": number,
            "slug": string, // "everyone",
            "name": string, // "Everyone"
        },
        "platforms": [
            {
                "platform": {},
                "released_at": string,
                "requirements": {}
            }
        ]
    }[]
}

async function getFirstGamePage(apiKey: string): Promise<GamesPage | null> {
    try {
        const req = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`, {
            next: {
                revalidate: 60 * 60 * 24
            }
        });
        const data = await req.json();
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default async function videogamesPage() {
    const rawgApiKey = process.env.RAWG_API_KEY || '';
    const gamesPage = await getFirstGamePage(rawgApiKey);
    const gamesData = (gamesPage) ? gamesPage.results : null;
    console.log(gamesPage)
    return (
        gamesData ?
            <GamesList games={gamesData} />
            :
            <span>Error loading game list.</span>
    )
}