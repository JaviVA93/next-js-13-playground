import Clock from '../../components/Clock';
import PokemonGenerator from '../../components/PokemonGenerator';
import styles from '../../styles/clockPage.module.css';


export default async function clockPage () {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>This is the clock page :)</h1>
            <Clock />
            {/* @ts-expect-error Server Component */}
            <PokemonGenerator />
        </div>
    )
}