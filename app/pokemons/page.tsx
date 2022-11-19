import PokemonGenerator from "../../components/PokemonGenerator";
import PokemonList from "../../components/PokemonList";

const getPokemonsList = async (): Promise<[{ name: string, url: string }]> => {
    const req = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000', { next: { revalidate: 60*60*24 } });
    const reqData = await req.json();
    return reqData.results;
}

export default async function PokemonsPage() {
    const pokemonList = await getPokemonsList();
    return (
        <div>
            {/* @ts-expect-error Server Component */}
            <PokemonGenerator pokemonList={pokemonList}/>
            <PokemonList pokemonList={pokemonList}/>
        </div>
        
    )
}