import { Header } from '../components/header/Header'
import '../styles/globals.css'
import { Source_Sans_Pro } from "next/font/google"
import LinkedinIconLink from '../components/assets/LinkedinIconLink'
import GithubIconLink from '../components/assets/GithubIconLink'

const sourceSansPro = Source_Sans_Pro({
  weight: ['400', '600'],
  subsets: ['latin']
})

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className={sourceSansPro.className}>
        <Header />
        <main>
          {children}
        </main>
        <div className="floatLinkIcons">
          <LinkedinIconLink />
          <GithubIconLink />
        </div>
      </body>
    </html>
  )
}
