import Image from 'next/image';
import Link from 'next/link';
import LeftArrowSvg from '../assets/LeftArrowSvg';
import styles from './pokemonStats.module.css';

export default function PokemonStats(params: any) {
    const { pokemonData } = params;
    return (
        <div className={styles.container}>
            <h2>Pokemon Stats</h2>
            {!pokemonData ?
                <span>Error generating the pokemon, please refresh.</span>
                :
                <div className={styles.stats}>
                    <Image src={pokemonData.imageUrl} alt={pokemonData.name} width={200} height={200} />
                    <table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{pokemonData.name}</td>
                            </tr>
                            <tr>
                                <td>Type:</td>
                                <td>{pokemonData.type}</td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                <td>{pokemonData.abilities}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            <Link className={styles.backLink} href={'/pokemons'}>
                <LeftArrowSvg />
                Go back
            </Link>
        </div>
    )
}