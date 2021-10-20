import '../styles/globals.css'

function Marketplace({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-3 flex">
        <a href="/mint" className="ml-auto inline-block font-bold px-5">Mint</a>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default Marketplace
