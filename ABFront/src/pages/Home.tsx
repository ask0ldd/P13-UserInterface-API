/* eslint-disable react-hooks/exhaustive-deps */
import '../style/App.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features/Features'
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { useTypedSelector } from "../hooks/redux"
import useAuthRefresher from '../hooks/useAuthRefresher'

function Home() {

  useAuthRefresher()

  const navigate = useNavigate()
  const token : string | null = useTypedSelector((state) => state.auth.token)

  // if user already connected => redirect to profile
  useEffect(()=> {
    if(token!=null) navigate("/profile")
  }, [token])

  if(token!=null) return(<></>)

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