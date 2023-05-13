/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "../components/Header"
import Footer from "../components/Footer"
import '../style/User.css'
import AccountStatement from "../components/AccountStatement"
// import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux"
// import { RootState, AppDispatch } from "../redux/store"
import { useTypedSelector } from "../hooks/redux"
import { useNavigate } from "react-router-dom"

function User(){

    const navigate = useNavigate()

    const id : string | null = useTypedSelector((state) => state.auth.id)
    const logged : boolean = useTypedSelector((state) => state.auth.logged)

    if (logged === false) navigate("/login")

    return(
        <div className='App'>
        <Header/>
        <main className='main-user'>
            <h1 className="h1-user">Welcome back<br/>Tony {id} Jarvis!</h1>
            <button className="edit-button">Edit Name</button>
            <h2 className="sr-only">Accounts</h2>
            <AccountStatement accountType="Checking" accountId="x8349" balance="2082.79" balanceStatus="Available Balance"/>
            <AccountStatement accountType="Savings" accountId="x6712" balance="10928.42" balanceStatus="Available Balance"/>
            <AccountStatement accountType="Credit Card" accountId="x8349" balance="184.30" balanceStatus="Current Balance"/>
        </main>
        <Footer/>
      </div>        
    )
}

export default User