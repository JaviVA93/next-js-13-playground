import Clock from '../components/clock/Clock'
import Pomodoro from '../components/pomodoro/Pomodoro'
import styles from '../styles/homePage.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>
          Hi, I&apos;m testing NextJS 13 &#128516;
        </h1>
        <section>
          <Clock />
          <Pomodoro />
        </section>
    </div>
  )
}
