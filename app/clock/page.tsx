import Clock from '../../components/clock/Clock';
import Pomodoro from '../../components/pomodoro/Pomodoro';
import styles from '../../styles/clockPage.module.css';


export default async function clockPage () {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>This is the clock page :)</h1>
            <Clock />
            <Pomodoro />
        </div>
    )
}