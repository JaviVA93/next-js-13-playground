'use client'

import Image from 'next/image';
import Link from 'next/link';
import { MouseEventHandler, useRef, useState } from 'react';
import GameCard from '../game-card/GameCard';
import styles from './gamesList.module.css';

interface GameInfo {
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
interface GamesPage {
    next: string,
    previous: string,
    results: GameInfo[]
}


export default function GamesList({ gamesPage }: { gamesPage: GamesPage }) {
    const [games, setGames] = useState<GameInfo[] | null>(gamesPage.results);
    const previousPage = useRef(gamesPage.previous);
    const nextPage = useRef(gamesPage.next);
    const sortType = useRef<string | null>(null);
    const sortButtonsContainer = useRef<HTMLDivElement>(null)

    const clearSelectedSortButton = () => {
        // TO-DO:
        // THE REFERENCE TO THE BUTTONS CONTAINER IS NOT WORKING
        console.log('sortButtonsContainer', sortButtonsContainer.current)
        if (!sortButtonsContainer.current) return;
        sortButtonsContainer.current.querySelector('button[selected]')?.removeAttribute('selected');
        sortButtonsContainer.current.querySelector('button[ordering]')?.removeAttribute('ordering');
        sortType.current = null;
    }

    const loadNextPage = () => {
        const url = new URL(nextPage.current);
        const pageValue = url.searchParams.get('page');
        const pageParam = (pageValue) ? `page=${pageValue}` : '';

        const sortParam = (sortType.current) ? `&ordering=${sortType.current}` : '';
        const metacriticParam = (sortType.current?.includes('metacritic')) ? '&metacritic=1,100' : '';

        setGames(null);
        fetch(`/api/videogames?${pageParam}${sortParam}${metacriticParam}`)
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

        const sortParam = (sortType.current) ? `&ordering=${sortType.current}` : '';
        const metacriticParam = (sortType.current?.includes('metacritic')) ? '&metacritic=1,100' : '';

        setGames(null);
        fetch(`/api/videogames?${pageParam}${sortParam}${metacriticParam}`)
            .then(r => r.json().then((d: GamesPage | null) => {
                if (d) {
                    previousPage.current = d.previous;
                    nextPage.current = d.next;
                    setGames(d.results);
                }
            }));
    }
    const sortBy = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!(event.target instanceof HTMLElement)) return;

        const sortTypeAtt = event.target.getAttribute('sortType');
        if (!sortTypeAtt) return;
<<<<<<< HEAD:components/game-list/GamesList.tsx

        console.log(event.target.getAttribute('ordering'));
        console.log(event.target.getAttribute('selected'))
        if (event.target.getAttribute('selected') !== null)
            if (event.target.getAttribute('ordering') === 'asc')
                event.target.setAttribute('ordering', 'desc');
            else
                clearSelectedSortButton();
=======
        
        if (event.target.getAttribute('selected') !== null) {
            if (event.target.getAttribute('ordering') === 'desc')
                event.target.setAttribute('ordering', 'asc')
            else if (event.target.getAttribute('ordering') === 'asc') {
                // UNSELECT SORT TYPE
                event.target.removeAttribute('ordering');
                event.target.removeAttribute('selected');
            }
            else
                event.target.setAttribute('ordering', 'desc')
        }
>>>>>>> main:components/GamesList.tsx
        else {
            clearSelectedSortButton();
            event.target.setAttribute('selected', '');
            event.target.setAttribute('ordering', 'desc');
        }

        const metacriticParam = (sortTypeAtt === 'metacritic') ? 'metacritic=1,100' : '';
        if (event.target.getAttribute('ordering') === null)
            sortType.current = null;
        else
            sortType.current = (event.target.getAttribute('ordering') === 'asc') ? sortTypeAtt : `-${sortTypeAtt}`;

        // Forcing loading step
        setGames(null);

        const sortParam = `ordering=${sortType.current}`;
        fetch(`/api/videogames?${sortParam}&${metacriticParam}`)
            .then(r => r.json().then((d: GamesPage | null) => {
                if (d) {
                    previousPage.current = d.previous;
                    nextPage.current = d.next;
                    setGames(d.results);
                }
            }));
    }

    const gameElements = games?.map(g => {
        return (
            <GameCard key={g.id} gameid={g.id} name={g.name} imageUrl={g.background_image} metacritic={g.metacritic} 
                releaseDate={g.released} slug={g.slug} />
        )
    });
    const loadingDataElement =
        <div className={styles.loaderContainer}>
            Loading Data
            <div className={styles.batmanLoader}></div>
        </div>

    const loadingDataSkeleton = Array(12).map((v, i) => {
        return <GameCard key={`skeleton-${i}`} gameid={null} name={null} imageUrl={null} metacritic={null} 
            releaseDate={null} slug={null} />
    });
    return (
        <div className={styles.container}>
            <div className={styles.sortButtons} ref={sortButtonsContainer}>
                {/* @ts-ignore */}
                <button sorttype="name" onClick={sortBy}>Name</button>
                {/* @ts-ignore */}
                <button sorttype="released" onClick={sortBy}>Released</button>
                {/* @ts-ignore */}
                <button sorttype="metacritic" onClick={sortBy}>Metacritic</button>
            </div>
            <div className={styles.gamesGrid}>
                {games ?
                    gameElements
                    :
                    // loadingDataElement
                    loadingDataSkeleton
                }
            </div>
            <div className={styles.nextPrevButtons}>
                {!previousPage.current ?
                    <button disabled>Previous Page</button>
                    :
                    <button onClick={loadPreviousPage}>Previous Page</button>
                }

                <button onClick={loadNextPage}>Next Page</button>
            </div>
        </div>

    );
}
