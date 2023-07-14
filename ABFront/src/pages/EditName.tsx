/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../components/Header"
import Footer from "../components/Footer"
import '../style/EditName.css'
import AccountStatement from "../components/AccountStatement"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from 'react'
import { useTypedSelector, useTypedDispatch } from "../hooks/redux"
import { updateNames } from "../redux/features/auth/authSlice"
import { setEditNamesError } from "../redux/features/forms/formsSlice"
import Validator from "../services/validators"



function EditName(){

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const firstnameRef = useRef<HTMLInputElement>(null)
    const lastnameRef = useRef<HTMLInputElement>(null)

    const logged : boolean = useTypedSelector((state) => state.auth.logged)
    const firstname : string | null = useTypedSelector((state) => state.auth.firstname)
    const lastname : string | null = useTypedSelector((state) => state.auth.lastname)
    const token : string | null = useTypedSelector((state) => state.auth.token)
    const editNamesFailedValidation : boolean = useTypedSelector((state) => state.forms.editNamesFailedValidation)

    useEffect(() => {
        if (logged === false) navigate("/login")
    }, [logged])

    async function submitEditNames(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        e.stopPropagation()

        // firstname / lastname fields : empty ?
        if(firstnameRef.current?.value == null || lastnameRef.current?.value == null) {
            // display error message on page
            dispatch(setEditNamesError({hasValidationFailed : true}))
            return false
        }

        const inputFirstname = (firstnameRef.current.value).trim()
        const inputLastname = (lastnameRef.current.value).trim()

        // firstname / lastname values : incorrect format ?
        if(!Validator.testName(inputFirstname) || !Validator.testName(inputLastname) || token == null) {
            // display error message on page
            dispatch(setEditNamesError({hasValidationFailed : true}))
            return false
        }

        // no error message displayed + update names through the API
        dispatch(setEditNamesError({hasValidationFailed : false}))
        dispatch(updateNames({firstName : inputFirstname, lastName : inputLastname}))
        navigate("/user")
    }

    function cancelEditNames(){
        navigate("/user")
    }

    return(
        <div className='App'>
        <Header firstname={firstname}/>
        <main className='edit-main-user'>
            <h1 className="h1-user">Welcome back</h1>
            <form id="editnames-form" onSubmit={e => submitEditNames(e)}>
                <div className="input-grp">
                    <input ref={firstnameRef} type="text" defaultValue={firstname != null ? firstname : undefined}/>
                    <input ref={lastnameRef} type="text" defaultValue={lastname != null ? lastname : undefined}/>
                </div>
                {editNamesFailedValidation && 
                    <div style={{color:'red', height:'20px', fontSize:'14px', display:"flex", justifyContent:"center", alignItems:"center"}}>Invalid or empty field.</div>}
                <div className="button-grp">
                    <button type="submit" id="save-button" className="edit-button">Save</button>
                    <button type="button" onClick={cancelEditNames} id="cancel-button" className="edit-button">Cancel</button>
                </div>
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