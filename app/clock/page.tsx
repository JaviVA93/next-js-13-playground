import Clock from '../../components/clock/Clock';
import PokemonGenerator from '../../components/pokemonGenerator/PokemonGenerator';
import styles from './page.module.css';


export default async function clock () {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>This is the clock page :)</h1>
            <Clock />
            {/* @ts-expect-error Server Component */}
            <PokemonGenerator />
        </div>
    )
}