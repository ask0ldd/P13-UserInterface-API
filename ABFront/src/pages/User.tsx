/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../components/Header"
import Footer from "../components/Footer"
import '../style/User.css'
import AccountStatement from "../components/AccountStatement"
import { useTypedSelector, useTypedDispatch } from "../hooks/redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { getProfile } from "../redux/features/auth/authSlice"
import { IAccount, getAccountsStatements } from "../redux/features/accounts/accountsSlice"
import Formatter from "../services/formaters"
import RouteProtector from "../components/RouteProtector"
import cookiesManager from "../services/cookiesManager"
import useAuthRefresher from "../hooks/useAuthRefresher"

function User(){

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const logged : boolean = useTypedSelector((state) => state.auth.logged)
    const token : string | null = useTypedSelector((state) => state.auth.token)
    const firstname : string | null = useTypedSelector((state) => state.auth.firstname)
    const lastname : string | null = useTypedSelector((state) => state.auth.lastname)
    const accountsState : Array<IAccount> = useTypedSelector((state) => state.accounts.accounts)
    const cookiesToken = cookiesManager.getToken()

    useAuthRefresher()

    useEffect(() => {
        if(logged === false && token == null && cookiesToken == null) return
        async function getUserProfile() { dispatch(getProfile()) }
        getUserProfile()
    }, [logged]) // triggered after the first render and when the logged value changes


    // get the accounts datas from the mockAPI
    useEffect(() => {
        if(logged === false && token == null && cookiesToken == null) return
        async function getAccountsDatas() {
            dispatch(getAccountsStatements())
        }
        getAccountsDatas()
    }, [])

    function editName(){
        if (logged === true && lastname != null && firstname != null) navigate("/editname")
    }
    
    return(
    <div className='App'>
        {/*<AuthRefresher/>*/}
        <RouteProtector/>
        <Header firstname={firstname}/>
        <main className='main-user'>
            <h1 className="h1-user">Welcome back<br/>{(firstname!=null && lastname!=null) && <span>{Formatter.firstCharMaj(firstname)} {Formatter.firstCharMaj(lastname)}</span>}!</h1>
            <button className="edit-button" onClick={editName}>Edit Name</button>
            <h2 className="sr-only">Accounts</h2>
            {accountsState?.length > 0 && accountsState?.map((account, index) => (<AccountStatement key={index} accountType={account.title} accountId={account.lastDigits} balance={account.amount} balanceStatus={account.amountDescription} mode="default"/>))}
        </main>
        <Footer/>
    </div>        
    )
}

export default User