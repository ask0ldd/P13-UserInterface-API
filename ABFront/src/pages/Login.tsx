import '../style/App.css'
import '../style/Login.css'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Login() {
  // const [count, setCount] = useState(0)

  return (
  <div className='App'>
    <Header/>
    <main className='main-login'>
        <section className="login-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form>
                <label htmlFor="username" className='text-label'>Username</label>
                <input id="username" type="text" className='text-input'/>
                <label htmlFor="password" className='text-label'>Password</label>
                <input id="password" type="password" className='text-input'/>
                <div className='check-container'>
                    <input type='checkbox' id="remember-me"/><label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="login-button">Sign In</button>
            </form>
        </section>
    </main>
    <Footer/>
  </div>
  )
}

export default Login