// import { useState } from 'react'
import '../style/App.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features/Features'
import { useTypedDispatch } from '../hooks/redux'
import { getAccountsStatements } from '../redux/features/api/apiSlice'

function Home() {
  // const [count, setCount] = useState(0)
  const dispatch = useTypedDispatch()
  // unwrap extract the payload out of the action
  dispatch(getAccountsStatements()).unwrap().then(res => console.log(res))

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