/* eslint-disable no-unused-vars*/
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../components/Header"
import Footer from "../components/Footer"
import '../style/EditName.css'
import AccountStatement from "../components/AccountStatement"
import { useTypedSelector, useTypedDispatch } from "../hooks/redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { updateNames } from "../redux/features/auth/authSlice"
import Validator from "../services/validators"


function EditName(){

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const firstnameRef = useRef<HTMLInputElement>(null)
    const lastnameRef = useRef<HTMLInputElement>(null)

    const logged : boolean = useTypedSelector((state) => state.auth.logged) // logged or just checking token ?
    const firstname : string | null = useTypedSelector((state) => state.auth.firstname)
    const lastname : string | null = useTypedSelector((state) => state.auth.lastname)
    const token : string | null = useTypedSelector((state) => state.auth.token)

    useEffect(() => {
        if (logged === false) navigate("/login")
    }, [logged])

    const [validationError, setValidationError] = useState<boolean>(false)

    async function submit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        e.stopPropagation()

        if(firstnameRef.current?.value == null || lastnameRef.current?.value == null) {
            setValidationError(true)
            return false
        }

        const inputFirstname = (firstnameRef.current.value).trim()
        const inputLastname = (lastnameRef.current.value).trim()

        // !!! needs to display an error
        if(!Validator.testName(inputFirstname) || !Validator.testName(inputLastname) || token == null) {
            setValidationError(true)
            return false
        }

        setValidationError(false)
        await dispatch(updateNames({firstName : inputFirstname, lastName : inputLastname}))
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
                {validationError && <div style={{color:'red', height:'20px', fontSize:'14px', display:"flex", justifyContent:"center", alignItems:"center"}}>Invalid or empty field.</div>}
                <div className="button-grp">
                    <button type="submit" id="save-button" className="edit-button">Save</button>
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