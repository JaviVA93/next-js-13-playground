import styles from '../styles/homePage.module.css'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome to the Home page
        </h1>
        <ContactForm />
    </div>
  )
}
