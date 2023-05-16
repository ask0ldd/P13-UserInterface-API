// import { useState } from 'react'
import '../style/App.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features/Features'
import { getAccounts } from '../redux/features/api/apiSlice'
import { useTypedDispatch } from '../hooks/redux'

function Home() {
  // const [count, setCount] = useState(0)
  const dispatch = useTypedDispatch()
  dispatch(getAccounts())

  return (
  <div className='App'>
    <Header/>
    <main className='main-home'>
      <Hero/>
      <Features/>

    </main>
    <Footer/>
  </div>
  )
}

export default Home