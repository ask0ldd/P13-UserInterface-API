/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "../components/Header"
import Footer from "../components/Footer"
import '../style/User.css'
import AccountStatement from "../components/AccountStatement"
import { useTypedSelector, useTypedDispatch } from "../hooks/redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { API } from "../services/API"
import { setNames, getProfile } from "../redux/features/auth/authSlice"
import { IAccount, getAccountsStatements } from "../redux/features/accounts/accountsSlice"
// import { getAccountsStatements } from "../redux/features/api/mockAccountsAPISlice"


function User(){

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const logged : boolean = useTypedSelector((state) => state.auth.logged) // logged or just checking token ?
    const firstname : string | null = useTypedSelector((state) => state.auth.firstname)
    const lastname : string | null = useTypedSelector((state) => state.auth.lastname)
    const accountsState : Array<IAccount> = useTypedSelector((state) => state.accounts.accounts)
    const token : string | null = useTypedSelector((state) => state.auth.token)

    // get the user's profile datas out of the USERS API
    useEffect(() => {
        if (logged === false) return navigate("/login")
        async function getUserProfile() {
            const profileDatas = await dispatch(getProfile(token))
            console.log(profileDatas)
        }
        getUserProfile()
    }, [logged]) // triggered after the first render and when the log value changes

    // get the accounts datas from the mock ACCOUNTS API and set them to the accounts state
    useEffect(() => {
        async function getAccountsDatas() {
            // unwrap extract the payload out of the action
            const accountsDatas = await dispatch(getAccountsStatements()).unwrap()
            console.log(accountsDatas)
        }
        getAccountsDatas()
    }, [])

    function editName(){
        if (logged === true && lastname != null && firstname != null) navigate("/editname") // user a navlink?
    }

    return(
        <div className='App'>
        <Header firstname={firstname}/>
        <main className='main-user'>
            <h1 className="h1-user">Welcome back<br/>{(firstname!=null && lastname!=null) && <span>{firstname} {lastname}</span>}!</h1>
            <button className="edit-button" onClick={editName}>Edit Name</button>
            <h2 className="sr-only">Accounts</h2>
            {accountsState.length > 0 && accountsState.map((account, index) => (<AccountStatement key={index} accountType={account.title} accountId={account.lastDigits} balance={account.amount} balanceStatus={account.amountDescription} mode="default"/>))}
        </main>
        <Footer/>
      </div>        
    )
}

export default User