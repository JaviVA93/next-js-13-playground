import Image from 'next/image';
import styles from './pokemonGenerator.module.css';

type Pokemon = {
    name: string,
    type: string,
    imageUrl: string,
}

const getPokemon = async (pokemonUrl: string): Promise<Pokemon | null> => {
    try {
        const pokemonsFetch = await fetch(pokemonUrl, { 
            next: { 
                revalidate: 60*60*24 
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

export default async function PokemonGenerator({pokemonList}: {pokemonList: any[]}) {
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
                    <span>Name:</span>
                    <span>{pokemon.name}</span>
                    <span>Type:</span>
                    <span>{pokemon.type}</span>
                </div>
            }
        </div>
    )
}