import '../styles/globals.css'
import Link from 'next/link'

function Marketplace({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-3 flex">
        <Link href="/mint" className="ml-auto inline-block font-bold px-5">Mint</Link>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default Marketplace
