import Image from 'next/image';
import LoadingSpinner from '../assets/loadin-spinner/LoadingSpinner';
import styles from './pokemonGenerator.module.css';

export default function PokemonGeneratorPlaceholder() {
    const placeholderImage = ''
    return (
        <div className={styles.container}>
            <h2>Choosing your pokemon...</h2>
                <div className={styles.pokemonInfo}>
                    <LoadingSpinner className={styles.loadingPlaceholder} />
                    <div>
                        <div className={styles.infoInline}>
                            <span>Name:</span>
                            <span>...</span>
                        </div>
                        <div className={styles.infoInline}>
                            <span>Type:</span>
                            <span>...</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}