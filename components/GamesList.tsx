import Image from 'next/image';
import styles from '../styles/gamesList.module.css';

interface GameData {
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
} 

export default function GamesList({ games }: { games: GameData[] }) {
    const gameElements = games.map(g => {
        return (
            <div key={g.id} className={styles.gameCard}>
                <Image src={g.background_image} alt={g.name} width={200} height={200} />
                <span>{g.name}</span>
            </div>
        )
    });
    return (
        <div className={styles.container}>
            {gameElements}
        </div>
    );
}