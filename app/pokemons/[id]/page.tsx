import Image from 'next/image';
import Link from 'next/link';
import PokemonStats from '../../../components/pokemon-stats/PokemonStats';
import styles from '../../../styles/pokemonStatsPage.module.css';

interface PokemonStats {
    name: string,
    type: string,
    imageUrl: string,
    abilities: string
}

const getPokemon = async (id: number): Promise<PokemonStats | null> => {
    try {
        const pokemonsFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, { next: { revalidate: 60*60*24 } });
        const pokemonData = await pokemonsFetch.json();
        let pokemonTypeStr = '';
        pokemonData.types.forEach((item: { type: { name: string } }, i: number) => {
            if (i === 0)
                pokemonTypeStr = item.type.name;
            else
                `${pokemonTypeStr}, ${item.type.name}`
        });
        let pokemonAbilitiesStr = '';
        pokemonData.abilities.forEach((a: { ability: { name: string } }, i: number) => {
            if (i === 0)
                pokemonAbilitiesStr = a.ability.name;
            else
                pokemonAbilitiesStr = `${pokemonAbilitiesStr}, ${a.ability.name}`;
        });
        const poke: PokemonStats = {
            name: pokemonData.name,
            type: pokemonTypeStr,
            imageUrl: pokemonData.sprites.other['official-artwork']['front_default'],
            abilities: pokemonAbilitiesStr
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

    return <PokemonStats pokemonData={pokemonData} />
}