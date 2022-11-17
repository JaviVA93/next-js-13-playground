import Image from 'next/image';
import Link from 'next/link';

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

export default async function pokemonInfo({ params }: { params: any }) {
    const { id } = params;
    const pokemonData = await getPokemon(id);

    return (
        <div>
            {!pokemonData ?
                <span>Error generating the pokemon, please refresh.</span>
                :
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Image src={pokemonData.imageUrl} alt={pokemonData.name} width={200} height={200} />
                    <span>Name:</span>
                    <span>{pokemonData.name}</span>
                    <span>Type:</span>
                    <span>{pokemonData.type}</span>
                </div>
            }
            <Link href={'/pokemons'}>
                <button>Go back</button>
            </Link>
        </div>
    )
}