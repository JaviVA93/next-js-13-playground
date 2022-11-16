import Link from "next/link";

const getPokemonsList = async (): Promise<[{ name: string, url: string }]> => {
    const req = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000');
    const reqData = await req.json();
    console.log(reqData.results)
    return reqData.results;
}

export default async function PokemonList() {
    const pokemonList = await getPokemonsList();

    return (
        <ul>
            {pokemonList.map(p =>
                <li key={p.url}>
                    <Link href={`/pokemons/${p.url.split('/')[6]}`}>{p.name}</Link>
                </li>
            )}
        </ul>
    )
}