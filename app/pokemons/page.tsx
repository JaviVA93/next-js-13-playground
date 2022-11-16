import PokemonGenerator from "../../components/PokemonGenerator";
import PokemonList from "../../components/PokemonList";

export default async function PokemonsPage() {
    return (
        <div>
            {/* @ts-expect-error Server Component */}
            <PokemonGenerator />
            {/* @ts-expect-error Server Component */}
            <PokemonList />
        </div>
        
    )
}