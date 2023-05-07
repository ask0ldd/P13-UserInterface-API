import { useRef } from 'react'
import '../style/App.css'
import '../style/Login.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { API } from '../utils/API'

function Login() {
  // const [count, setCount] = useState(0)
  /*const loginBtn = document.querySelector('.login-button')
  loginBtn?.addEventListener('click', (e) => {
    e.preventDefault()
    const email = document.querySelector('#username')?.nodeValue
    const password = document.querySelector('#password')?.nodeValue
    API.login({})
  })*/

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  function submit(){
    if(emailRef?.current != null && passwordRef?.current != null) 
      API.login({email : emailRef?.current, password : passwordRef?.current})
  }



  return (
  <div className='App'>
    <Header/>
    <main className='main-login'>
        <section className="login-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form>
                <label htmlFor="username" className='text-label'>Username</label>
                <input id="username" type="email" className='text-input' ref={emailRef}/>
                <label htmlFor="password" className='text-label'>Password</label>
                <input id="password" type="password" className='text-input' ref={passwordRef}/>
                <div className='check-container'>
                    <input type='checkbox' id="remember-me"/><label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="login-button" onClick={submit}>Sign In</button>
            </form>
        </section>
    </main>
    <Footer/>
  </div>
  )
}

export default Login