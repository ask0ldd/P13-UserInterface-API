import { useRef } from 'react'
import '../style/App.css'
import '../style/Login.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { API } from '../utils/API'
import { useTypedDispatch, useTypedSelector } from "../hooks/redux"
import { setCredentials } from "../redux/features/auth/authSlice"

function Login() {

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailAlt = `tony@stark.com`
  const passwordAlt = `password123`

  // assign to dispatch the dispatch method (typed version) from the store
  const dispatch = useTypedDispatch()

  /*async function submit(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    e.stopPropagation()
    if(emailRef?.current != null && passwordRef?.current != null) {
      const result = await API.login({email : emailRef?.current.value, password : passwordRef?.current.value})
    }
  }*/

  async function submit2(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    e.stopPropagation()
    const results = await API.login({email : emailAlt, password : passwordAlt})
    // dispatch(action(payload))
    dispatch(setCredentials(results))
  }

  // const user : string = useSelector((state : RootState) => state.auth.user)
  // but can use useTypedSelector so don't have to type the state :
  const user = useTypedSelector((state) => state.auth.user)



  return (
  <div className='App'>
    <Header/>
    <main className='main-login'>
        <section className="login-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In {user}</h1>
            <form onSubmit={e => submit2(e)}>
                <label htmlFor="username" className='text-label'>Username</label>
                <input id="username" type="email" className='text-input' ref={emailRef}/>
                <label htmlFor="password" className='text-label'>Password</label>
                <input id="password" type="password" className='text-input' ref={passwordRef}/>
                <div className='check-container'>
                    <input type='checkbox' id="remember-me"/><label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="login-button" type="submit">Sign In</button>
            </form>
        </section>
    </main>
    <Footer/>
  </div>
  )
}

export default Login