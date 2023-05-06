// import { useState } from 'react'
import '../style/App.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'

function Home() {
  // const [count, setCount] = useState(0)

  return (
  <div className='App'>
    <Header/>
    <main className='main-home'>
      <Hero/>

    </main>
    <Footer/>
  </div>
  )
}

export default Home