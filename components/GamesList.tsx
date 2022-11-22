'use client'

import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from '../styles/gamesList.module.css';

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

export default function GamesList({ gamesPage }: { gamesPage: GamesPage }) {
    const [games, setGames] = useState(gamesPage.results);
    const previousPage = useRef(gamesPage.previous);
    const nextPage = useRef(gamesPage.next);

    const loadNextPage = () => {
        const url = new URL(nextPage.current);
        const pageValue = url.searchParams.get('page');
        const pageParam = (pageValue) ? `page=${pageValue}` : '';
        fetch(`/api/videogames?${pageParam}`)
            .then(r => r.json().then((d: GamesPage | null) => {
                if (d) {
                    previousPage.current = d.previous;
                    nextPage.current = d.next;
                    setGames(d.results);
                }
            }));
    }
    const loadPreviousPage = () => {
        const url = new URL(previousPage.current);
        const pageValue = url.searchParams.get('page');
        const pageParam = (pageValue) ? `page=${pageValue}` : '';
        fetch(`/api/videogames?${pageParam}`)
            .then(r => r.json().then((d: GamesPage | null) => {
                if (d) {
                    previousPage.current = d.previous;
                    nextPage.current = d.next;
                    setGames(d.results);
                }
            }));
    }

    const gameElements = games.map(g => {
        return (
            <div key={g.id} className={styles.gameCard}>
                <Image src={g.background_image} alt={g.name} width={200} height={200} />
                <span style={{ marginTop: 'auto' }}>{g.name}</span>
                <span style={{ fontSize: '0.8rem' }}>Metacritic: {g.metacritic}</span>
            </div>
        )
    });
    return (
        <div className={styles.container}>
            <div className={styles.gamesGrid}>
                {gameElements}
            </div>
            <div className={styles.nextPrevButtons}>
                <button onClick={loadPreviousPage}>Previous Page</button>
                <button onClick={loadNextPage}>Next Page</button>
            </div>
        </div>

    );
}