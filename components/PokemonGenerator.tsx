import Image from 'next/image';
import styles from '../styles/pokemonGenerator.module.css';

const getNumPokemonSpecies = async (): Promise<number> => {
    try {
        const pokemonsFetch = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1');
        const pokemonsFetchData = await pokemonsFetch.json();
        return pokemonsFetchData.count;
    } catch (e) {
        console.error(e);
        return 0;
    }
}
type Pokemon = {
    name: string,
    type: string,
    imageUrl: string,
}
const getPokemon = async (id: number): Promise<Pokemon | null> => {
    try {
        const pokemonsFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
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
    const numPokemons = await getNumPokemonSpecies();
    const randomId = Math.floor(Math.random() * (numPokemons - 1) + 1);
    const pokemon = await getPokemon(randomId);
    return (
        <div className={styles.container}>
            <h2>PokeGenerator :)</h2>
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