/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "../components/Header"
import Footer from "../components/Footer"
import '../style/User.css'
import AccountStatement from "../components/AccountStatement"
import { useTypedSelector, useTypedDispatch } from "../hooks/redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { API } from "../utils/API"
import { setNames } from "../redux/features/auth/authSlice"
import store from "../redux/store"


function User(){

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const logged : boolean = useTypedSelector((state) => state.auth.logged) // logged or just checking token ?
    const firstname : string | null = useTypedSelector((state) => state.auth.firstname)
    const lastname : string | null = useTypedSelector((state) => state.auth.lastname)

    useEffect(() => {
        if (logged === false) navigate("/login")
        async function getProfile() {
                const profileDatas = await API.getProfile()
                dispatch(setNames({firstname : profileDatas.firstname, lastname: profileDatas.lastname}))
        }
        getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logged]) // triggered after the first render and when the log value changes

    function editName(){
        if (logged === true && lastname != null && firstname != null) return navigate("/editname")
    }

    /*async function getProfileThunk(dispatch : any, state : typeof store.getState){
        const profileDatas = await API.getProfile()
        dispatch(setNames({firstname : profileDatas.firstname, lastname: profileDatas.lastname}))
        
    }

    useEffect(() => {
        if (logged === false) navigate("/login")
        dispatch(getProfileThunk(dispatch, state.getState()))
    }, [logged])*/

    return(
        <div className='App'>
        <Header firstname={firstname}/>
        <main className='main-user'>
            <h1 className="h1-user">Welcome back<br/>{(firstname!=null && lastname!=null) && <span>{firstname} {lastname}</span>}!</h1>
            <button className="edit-button" onClick={editName}>Edit Name</button>
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