import Image from 'next/image';
import styles from './pokemonGenerator.module.css';
import { Pokemon } from '../../types'


const getPokemonsList = async (): Promise<[{ name: string, url: string }]> => {
    const req = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000', { next: { revalidate: 60*60*24 } });
    const reqData = await req.json();
    return reqData.results;
}

const getPokemon = async (pokemonUrl: string): Promise<Pokemon | null> => {
    try {
        const pokemonsFetch = await fetch(pokemonUrl, {
            next: {
                revalidate: 60 * 60 * 24
            }
        });
        const pokemonData = await pokemonsFetch.json();
        const pokemonType = pokemonData.types.map(
            (item: { type: { name: string } }, i: number) => (i < pokemonData.types.length - 1) ? `${item.type.name}, ` : item.type.name
        );
        const poke: Pokemon = {
            name: pokemonData.name,
            type: pokemonType,
            imageUrl: pokemonData.sprites.other['official-artwork']['front_default']
        }
        return poke
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default async function PokemonGenerator() {

    await new Promise(resolve => {
        setTimeout(() => resolve(true), 2000);
    });

    const pokemonList = await getPokemonsList();

    const randomId = Math.floor(Math.random() * (pokemonList.length - 1) + 1);

    const pokemon = await getPokemon(pokemonList[randomId].url);
    return (
        <div className={styles.container}>
            <h2>This is your random pokemon :)</h2>
            {!pokemon ?
                <span>Error generating the pokemon, please refresh.</span>
                :
                <div className={styles.pokemonInfo}>
                    <Image src={pokemon.imageUrl} alt={pokemon.name} width={200} height={200} />
                    <div>
                        <div className={styles.infoInline}>
                            <span>Name:</span>
                            <span>{pokemon.name}</span>
                        </div>
                        <div className={styles.infoInline}>
                            <span>Type:</span>
                            <span>{pokemon.type}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}