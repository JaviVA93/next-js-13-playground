
export default function videogamesPageLayout ({ children, }: { children: React.ReactNode}) {
    return (
        <div>
            <h1>Videogames</h1>
            {children}
        </div>
    )
}