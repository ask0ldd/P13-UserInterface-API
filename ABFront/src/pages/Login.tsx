/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'
import '../style/App.css'
import '../style/Login.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useTypedDispatch, useTypedSelector } from "../hooks/redux"
import { setCredentials, logAttempt } from "../redux/features/auth/authSlice"
import { useNavigate } from 'react-router-dom'
import Validator from '../services/validators'
import cookiesManager from '../services/cookiesManager'
import { setLoginError } from '../redux/features/forms/formsSlice'

function Login() {

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const rememberMeRef = useRef<HTMLInputElement>(null)
  // const errorIdentifiantsRef = useRef<HTMLInputElement>(null)

  // assign to dispatch the dispatch method (typed version) from the store
  const dispatch = useTypedDispatch()

  const navigate = useNavigate()

  // but can use useTypedSelector so the state doesn't have to be typed each time :
  const logged : boolean = useTypedSelector((state) => state.auth.logged)
  const LoginFailedValidation : boolean = useTypedSelector((state) => state.forms.loginFailedValidation)

  async function submit(e : React.FormEvent<HTMLFormElement>){

    e.preventDefault()
    e.stopPropagation()

    // if blank email || blank password
    if(emailRef?.current?.value == null || passwordRef?.current?.value == null) {
      dispatch(setLoginError({hasValidationFailed : true}))
      return false
    }
    // if invalid email format || invalid password format
    if(!Validator.testEmail(emailRef.current.value) || !Validator.testPassword(passwordRef.current.value)) {
      dispatch(setLoginError({hasValidationFailed : true}))
      return false
    }
    // login attempt
    const response = await dispatch(logAttempt({email : emailRef.current.value, password : passwordRef.current.value, persistent : rememberMeRef.current?.checked || false})).unwrap()
    // failure
    if (response?.failed === true) {
      dispatch(setLoginError({hasValidationFailed : true}))
      return false
    }
    // success
    return dispatch(setLoginError({hasValidationFailed : false}))
  }

  // if state.auth.logged === true || email & token are into the cookies > redirect to the user profile
  useEffect(()=> {
    const {cookieEmailValue, cookieTokenValue} = {cookieEmailValue : cookiesManager.getEmail(), cookieTokenValue : cookiesManager.getToken()}
    // sets logged back to true if the cookies are populated & the state has been lost due to some page refresh
    if (cookieEmailValue!==null && cookieTokenValue!==null) dispatch(setCredentials({email : cookieEmailValue, token : cookieTokenValue}))
    if (logged === true) navigate("/user")
  }, [logged])

  return (
  <div className='App'>
    <Header/>
    <main className='main-login'>
        <section className="login-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={e => submit(e)}>
                <label htmlFor="username" className='text-label'>Username</label>
                <input id="username" type="email" className='text-input' ref={emailRef} defaultValue="tony@stark.com"/>
                <label htmlFor="password" className='text-label'>Password</label>
                <input id="password" type="password" className='text-input' ref={passwordRef} defaultValue="password123"/>
                <div className='check-container'>
                    <input type='checkbox' id="remember-me" ref={rememberMeRef}/><label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="login-button" type="submit">Sign In</button>
                {LoginFailedValidation === true && <div style={{color:'red', height:'40px', fontSize:'14px', display:"flex", justifyContent:"center", alignItems:"center"}}>Identifiants Invalides.</div>}
            </form>
        </section>
    </main>
    <Footer/>
  </div>
  )
}

export default Login