/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "../components/Header"
import Footer from "../components/Footer"
import '../style/EditName.css'
import AccountStatement from "../components/AccountStatement"
import { useTypedSelector, useTypedDispatch } from "../hooks/redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from 'react'
import { API } from "../services/API"
import { setNames } from "../redux/features/auth/authSlice"
import Validator from "../services/validators"


function EditName(){

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const firstnameRef = useRef<HTMLInputElement>(null)
    const lastnameRef = useRef<HTMLInputElement>(null)

    const logged : boolean = useTypedSelector((state) => state.auth.logged) // logged or just checking token ?
    const firstname : string | null = useTypedSelector((state) => state.auth.firstname)
    const lastname : string | null = useTypedSelector((state) => state.auth.lastname)

    useEffect(() => {
        if (logged === false) navigate("/login")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logged])

    async function submit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        e.stopPropagation()

        if(firstnameRef.current?.value == null || lastnameRef.current?.value == null) return false

        const inputFirstname = (firstnameRef.current.value).trim()
        const inputLastname = (lastnameRef.current.value).trim()

        if(!Validator.testName(inputFirstname) || !Validator.testName(inputLastname)) return false

        dispatch(setNames({inputFirstname, inputLastname}))
        const results = await API.updateNames({'firstName' : inputFirstname, 'lastName' : inputLastname})
        if(results?.error) return false
        // deal with errors
        navigate("/user")
    }

    function cancel(){
        navigate("/user")
    }

    return(
        <div className='App'>
        <Header firstname={firstname}/>
        <main className='edit-main-user'>
            <h1 className="h1-user">Welcome back</h1>
            <form id="editnames-form" onSubmit={e => submit(e)}>
                <div className="input-grp">
                    <input ref={firstnameRef} type="text" defaultValue={firstname != null ? firstname : undefined}/>
                    <input ref={lastnameRef} type="text" defaultValue={lastname != null ? lastname : undefined}/>
                </div>
                <div className="button-grp">
                    <button id="save-button" className="edit-button">Save</button>
                    <button onClick={cancel} id="cancel-button" className="edit-button">Cancel</button>
                </div>
            </form>
            <h2 className="sr-only">Accounts</h2>
            <AccountStatement accountType="Checking" accountId="x8349" balance="2,082.79" balanceStatus="Available Balance" mode="edit"/>
            <AccountStatement accountType="Savings" accountId="x6712" balance="10,928.42" balanceStatus="Available Balance" mode="edit"/>
            <AccountStatement accountType="Credit Card" accountId="x8349" balance="184.30" balanceStatus="Current Balance" mode="edit"/>
        </main>
        <Footer/>
      </div>        
    )
}

export default EditName