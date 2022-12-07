import { json } from 'stream/consumers';
import styles from '../../../styles/gamePage.module.css';

interface GameDetails {
    "id": number,
    "slug": "string",
    "name": "string",
    "name_original": "string",
    "description": "string",
    "metacritic": 0,
    "metacritic_platforms": [
        {
            "metascore": 0,
            "url": "string"
        }
    ],
    "released": "2022-11-24",
    "tba": true,
    "updated": string, // "2022-11-24T13:38:57Z",
    "background_image": string, //"http://example.com",
    "background_image_additional": string,
    "website": string, // "http://example.com",
    "rating": number,
    "rating_top": number,
    "ratings": {},
    "reactions": {},
    "added": number,
    "added_by_status": {},
    "playtime": number,
    "screenshots_count": number,
    "movies_count": number,
    "creators_count": number,
    "achievements_count": number,
    "parent_achievements_count": string,
    "reddit_url": string,
    "reddit_name": string,
    "reddit_description": string,
    "reddit_logo": string, // "http://example.com",
    "reddit_count": number,
    "twitch_count": string,
    "youtube_count": string,
    "reviews_text_count": string,
    "ratings_count": number,
    "suggestions_count": number,
    "alternative_names": string[],
    "metacritic_url": string,
    "parents_count": number,
    "additions_count": number,
    "game_series_count": number,
    "esrb_rating": {
        "id": number,
        "slug": string, // "everyone",
        "name": string, // "Everyone"
    },
    "platforms": [
        {
            "platform": {
                "id": number,
                "slug": string,
                "name": string
            },
            "released_at": string,
            "requirements": {
                "minimum": string,
                "recommended": string
            }
        }
    ]
}

const getGameDetails = async (slug: string): Promise<GameDetails | null> => {
    try {
        const apiKey = process.env.RAWG_API_KEY || '';
        const req = await fetch(`https://api.rawg.io/api/games/${slug}?key=${apiKey}`, {
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

const getGameScreenshots = async (slug: string): Promise<GameDetails | null> => {
    try {
        const apiKey = process.env.RAWG_API_KEY || '';
        const req = await fetch(`https://api.rawg.io/api/games/${slug}?key=${apiKey}`, {
            next: {
                revalidate: 60 * 60 * 24
            }
        });
        const data = await req.json();
        return data.results || null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

const getGameTrailers = async (slug: string): Promise<{id: number, name: string, preview: string, data: any}[] | null> => {
    try {
        const apiKey = process.env.RAWG_API_KEY || '';
        const req = await fetch(`https://api.rawg.io/api/games/${slug}/movies?key=${apiKey}`, {
            next: {
                revalidate: 60 * 60 * 24
            }
        });
        const data = await req.json();
        return data.results || null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const errorLayout = <div>
    <h3>Error loading game </h3>
</div>

export default async function VideogamesListPage({ params }: { params: any }) {
    const { slug }: { slug: string } = params;
    // const gameDetails = await getGameDetails(slug);
    // const gameTrailers = await getGameTrailers(slug);
    const [gameDetails, gameTrailers] = await Promise.all([getGameDetails(slug), getGameTrailers(slug)]);
    console.dir(gameTrailers);

    const gameDetailsLayout = gameDetails ?
        <div>
            <div className={styles.container} style={{ backgroundImage: `linear-gradient(90deg, rgba(34,34,34,1) 0%, rgba(34,34,34,0.65) 50%, rgba(34,34,34,1) 100%), url(${gameDetails.background_image})` }}>
                <h3>{gameDetails.name}</h3>
                <span dangerouslySetInnerHTML={{__html: gameDetails.description}}></span>
            </div>
        </div>
        : '';
    const videoElement = gameTrailers && gameTrailers.length > 0 ?
        <video controls className={styles.videoElement}>
            <source src={gameTrailers[0].data.max} type="video/mp4" />
        </video>
        : '';

    return (
        <div>
            {
                gameDetails ?
                    gameDetailsLayout
                    :
                    errorLayout
            }
            {videoElement}
        </div>
    )
}