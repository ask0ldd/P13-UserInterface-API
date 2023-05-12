import '../style/Header.css'
import logo from '../assets/argentbank-logo.png'
import { NavLink } from 'react-router-dom'
import { logout } from '../redux/features/auth/authSlice'
import { useTypedDispatch } from '../hooks/redux'

function Header() {

    const dispatch = useTypedDispatch()

    function disco(){
        document.cookie = "token=; Max-Age=0;"
        document.cookie = "id=; Max-Age=0;"
        window.location.href = "index.html"
        dispatch(logout())
    }
    

    return (
        <header>
            <figure><img src={logo} alt="argent bank logo"/><h1 className="sr-only">Argent Bank</h1></figure>
            <nav>
                <NavLink className="signIn" to="/Login">
                    <i className="fa fa-user-circle"/>
                    Sign In
                </NavLink>
            </nav>
        </header>
    )
}

export default Header