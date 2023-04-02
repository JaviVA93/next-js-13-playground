
export default function PokemonsLayout ({ children, }: { children: React.ReactNode}) {
    return (
        <div>
            <h1>Pokemons</h1>
            {children}
        </div>
    )
}