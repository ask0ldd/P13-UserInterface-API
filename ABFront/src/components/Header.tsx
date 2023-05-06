import '../style/Header.css'
import logo from '../assets/argentbank-logo.png'
import { NavLink } from 'react-router-dom'

function Header () {
    return (
        <header>
            <figure><img src={logo} alt="argent bank logo"/><h1 className="sr-only">Argent Bank</h1></figure>
            <nav>
                <NavLink to="/">
                    <i className="fa fa-user-circle"/>
                    Sign In
                </NavLink>
            </nav>
        </header>
    )
}

export default Header