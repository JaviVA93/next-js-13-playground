import Clock from '../../components/clock/Clock';
import styles from './page.module.css';

export default function clock () {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>This is the clock page :)</h1>
            <Clock />
        </div>
    )
}