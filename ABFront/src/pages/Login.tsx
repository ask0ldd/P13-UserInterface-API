/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'
import '../style/App.css'
import '../style/Login.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useTypedDispatch, useTypedSelector } from "../hooks/redux"
import { logAttempt } from "../redux/features/auth/authSlice"
import { useNavigate } from 'react-router-dom'
import Validator from '../services/validators'
import { setLoginError } from '../redux/features/forms/formsSlice'
import useAuthRefresher from '../hooks/useAuthRefresher'

function Login() {

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const rememberMeRef = useRef<HTMLInputElement>(null)

  const dispatch = useTypedDispatch()
  const navigate = useNavigate()

  const token : string | null = useTypedSelector((state) => state.auth.token)
  const LoginFailedValidation : boolean = useTypedSelector((state) => state.forms.loginFailedValidation)
  
  useAuthRefresher()

  // Login Form submission
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
    // asyncthunk => unwrap (rtk) : extract action.payload
    const response = await dispatch(logAttempt({email : emailRef.current.value, password : passwordRef.current.value, persistent : rememberMeRef.current?.checked || false})).unwrap()
    
    if (response?.failed === true) {
      dispatch(setLoginError({hasValidationFailed : true}))
      return false
    }
    
    return dispatch(setLoginError({hasValidationFailed : false}))
  }

  // if user already connected => redirect to profile
  useEffect(()=> {
    if(token!=null) navigate("/profile")
  }, [token])

  if(token!=null) return(<></>)

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
                {LoginFailedValidation === true && 
                  <div className='loginFormErrorMessage'>Invalid credentials or API failing.</div>}
            </form>
        </section>
    </main>
    <Footer/>
  </div>
  )
}

export default Login