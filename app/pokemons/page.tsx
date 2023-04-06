import { Suspense } from "react";
import PokemonGenerator from "../../components/pokemon-generator/PokemonGenerator";
import PokemonGeneratorPlaceholder from '../../components/pokemon-generator/PokemonGeneratorPlaceholder'
import PokemonList from "../../components/pokemon-list/PokemonList";

const getPokemonsList = async (): Promise<[{ name: string, url: string }]> => {
    const req = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000', { next: { revalidate: 60*60*24 } });
    const reqData = await req.json();
    return reqData.results;
}

export default async function PokemonsPage() {


    return (
        <div>
            <Suspense 
                fallback={ <PokemonGeneratorPlaceholder /> }
                >
                {/* @ts-expect-error Server Component */}
                <PokemonGenerator />
            </Suspense>
            <PokemonList />
        </div>
        
    )
}