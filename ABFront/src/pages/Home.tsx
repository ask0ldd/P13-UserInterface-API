/* eslint-disable react-hooks/exhaustive-deps */
import '../style/App.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features/Features'
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { useTypedSelector, useTypedDispatch } from "../hooks/redux"
import cookiesManager from '../services/cookiesManager'
import { setCredentials } from "../redux/features/auth/authSlice"

function Home() {

  const dispatch = useTypedDispatch()
  const navigate = useNavigate()
  const logged : boolean = useTypedSelector((state) => state.auth.logged)

  // if state.auth.logged === true || email & token are into the cookies > redirect to the user profile
  useEffect(()=> {
    const {cookieEmailValue, cookieTokenValue} = {cookieEmailValue : cookiesManager.getEmail(), cookieTokenValue : cookiesManager.getToken()}
    // sets logged back to true if the cookies are populated & the state has been lost due to some page refresh
    if (cookieEmailValue!==null && cookieTokenValue!==null) dispatch(setCredentials({email : cookieEmailValue, token : cookieTokenValue}))
    if (logged === true) navigate("/profile")
  }, [logged])  

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