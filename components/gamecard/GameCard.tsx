import Link from 'next/link';
import styles from './gameCard.module.css';
import Image from 'next/image';

interface GameCardData {
    gameid: number,
    name: string | null,
    imageUrl: string,
    metacritic: number | null,
    releaseDate: string | null,
    slug: string
}


export default function GameCard({gameid, name, imageUrl, metacritic, releaseDate, slug }: GameCardData) {
    return (
        <div key={gameid} className={styles.gameCard}>
            <Link href={`/videogames/${slug}/`}>
                {imageUrl ?
                    <Image src={imageUrl} alt={(name) ? name : 'N/A'} width={200} height={200} />
                    :
                    ''
                }
                <span style={{ marginTop: 'auto' }}>{name ? name : 'N/A'}</span>
                <span style={{ fontSize: '0.8rem' }}>Released: {releaseDate ? releaseDate : 'N/A'}</span>
                <span style={{ fontSize: '0.8rem' }}>Metacritic: {metacritic ? metacritic : 'N/A'}</span>
            </Link>
        </div>
    )
}