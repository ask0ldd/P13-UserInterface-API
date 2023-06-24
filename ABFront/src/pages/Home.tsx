// import { useState } from 'react'
import '../style/App.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features/Features'
// import { useTypedDispatch } from '../hooks/redux'
// import { getAccountsStatements } from '../redux/features/api/apiSlice'

function Home() {

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