import Image from 'next/image'
import styles from '../../styles/videogamesPage.module.css';

async function getGames(apiKey: string) {
    const req = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`, {
        next: {
            revalidate: 60*60*24
        }
    });
    const data = await req.json();
    console.dir(data)
    return data.results.map((g: { id: string, name: string, background_image: string }) => {
        return (
            <div key={g.id}>
                <h3>{g.name}</h3>
                <Image src={g.background_image} alt={g.name} width={400} height={400} />
            </div>
        )
    });
}

export default async function videogamesPage() {
    const rawgApiKey = process.env.RAWG_API_KEY || '';
    const games = await getGames(rawgApiKey);
    return (
        <div className={styles.container}>
            {games}
        </div>
    )
}