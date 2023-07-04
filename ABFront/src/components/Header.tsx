import '../style/Header.css'
import logo from '../assets/argentbank-logo.png'
import { NavLink } from 'react-router-dom'
import { logout } from '../redux/features/auth/authSlice'
import { useTypedDispatch, useTypedSelector } from '../hooks/redux'
import Formatter from '../services/formaters'
import cookiesManager from '../services/cookiesManager'

interface IHeaderProps {
    firstname?: string | null // optional prop
}

function Header(props : IHeaderProps) {

    const dispatch = useTypedDispatch()

    function logoutFn(){
        /*document.cookie = "token=; Max-Age=0;"
        document.cookie = "email=; Max-Age=0;"*/
        cookiesManager.unsetAuthCookies()
        dispatch(logout())
    }

    const logged : boolean = useTypedSelector((state) => state.auth.logged)    

    return (
        <header>
            <figure><img src={logo} alt="argent bank logo"/><h1 className="sr-only">Argent Bank</h1></figure>
            <nav>    
                {!logged && 
                    <NavLink className="signIn" to="/Login"><i className="fa fa-user-circle"/>Sign In</NavLink>
                }
                {logged && 
                    <><i className="fa fa-user-circle"/>&nbsp;{props.firstname!=null && Formatter.firstCharMaj(props.firstname)}&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-sign-out"/><span style={{cursor: "pointer", fontWeight: "600"}} onClick={logoutFn}>&nbsp;Sign Out</span></>
                }
            </nav>
        </header>
    )
}

export default Header