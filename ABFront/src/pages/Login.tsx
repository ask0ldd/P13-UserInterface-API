import { useRef, useEffect } from 'react'
import '../style/App.css'
import '../style/Login.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { API } from '../utils/API'
import { useTypedDispatch, useTypedSelector } from "../hooks/redux"
import { setCredentials } from "../redux/features/auth/authSlice"
import { useNavigate } from 'react-router-dom'

function Login() {

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // assign to dispatch the dispatch method (typed version) from the store
  const dispatch = useTypedDispatch()

  const navigate = useNavigate()

  // const logged : boolean = useSelector((state : RootState) => state.auth.user)
  // but can use useTypedSelector so the state doesn't have to be typed each time :
  const logged : boolean = useTypedSelector((state) => state.auth.logged)

  async function submit(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    e.stopPropagation()
    if(emailRef?.current?.value!= null && passwordRef?.current?.value!=null){
      const results = await API.login({email : emailRef.current?.value, password : passwordRef.current?.value})
      // add to cookies only if remember me is checked
      
      // ie dispatch(action(payload))
      dispatch(setCredentials(results))
    }
  }

  // when state.auth.logged === true > redirect to user profile
  useEffect(()=> {
    if (logged === true) {
      console.log("test")
      navigate("/user")
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [logged])

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