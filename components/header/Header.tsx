import Link from "next/link"
import styles from './header.module.css'

const links = [
    {
      label: 'Home',
      route: '/'
    }, {
      label: 'Pokemons',
      route: '/pokemons'
    }, {
      label: 'Videogames',
      route: '/videogames'
    }, {
      label: 'Contact',
      route: '/contact'
    },    
  ]

export function Header () {
    return (
        <header className={styles.header}>
          <nav>
            <ul>
              {links.map(({label, route}) => { 
                return (
                  <li key={route}>
                    <Link href={route}>
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </header>
    )
}