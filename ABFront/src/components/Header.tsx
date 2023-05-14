import '../style/Header.css'
import logo from '../assets/argentbank-logo.png'
import { NavLink } from 'react-router-dom'
import { logout } from '../redux/features/auth/authSlice'
import { useTypedDispatch, useTypedSelector } from '../hooks/redux'

interface IHeaderProps {
    firstname?: string | null // optional prop
}

function Header(props : IHeaderProps) {

    const dispatch = useTypedDispatch()

    function logoutFn(){
        document.cookie = "token=; Max-Age=0;"
        document.cookie = "email=; Max-Age=0;"
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
                    <><i className="fa fa-user-circle"/>{props.firstname!=null && props.firstname}&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-sign-out"/><span onClick={logoutFn}>Sign Out</span></>
                }
            </nav>
        </header>
    )
}

export default Header