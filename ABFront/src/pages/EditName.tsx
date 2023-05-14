/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "../components/Header"
import Footer from "../components/Footer"
import '../style/EditName.css'
import AccountStatement from "../components/AccountStatement"
import { useTypedSelector, useTypedDispatch } from "../hooks/redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { API } from "../utils/API"
import { setNames } from "../redux/features/auth/authSlice"
import store from "../redux/store"


function EditName(){

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const logged : boolean = useTypedSelector((state) => state.auth.logged) // logged or just checking token ?
    const fistname : string | null = useTypedSelector((state) => state.auth.firstname)
    const lastname : string | null = useTypedSelector((state) => state.auth.lastname)

    useEffect(() => {
        if (logged === false) navigate("/login")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logged])

    return(
        <div className='App'>
        <Header firstname={fistname}/>
        <main className='main-user'>
            <h1 className="h1-user">Welcome back</h1>
            <form id="editnames-form">
                <div className="input-grp"><input id="firstname-input" type="text"/><input type="text"/></div>
                <div className="button-grp"><button id="save-button" className="edit-button">Save</button><button id="cancel-button" className="edit-button">Cancel</button></div>
            </form>
            <h2 className="sr-only">Accounts</h2>
            <AccountStatement accountType="Checking" accountId="x8349" balance="2082.79" balanceStatus="Available Balance" mode="edit"/>
            <AccountStatement accountType="Savings" accountId="x6712" balance="10928.42" balanceStatus="Available Balance" mode="edit"/>
            <AccountStatement accountType="Credit Card" accountId="x8349" balance="184.30" balanceStatus="Current Balance" mode="edit"/>
        </main>
        <Footer/>
      </div>        
    )
}

export default EditName