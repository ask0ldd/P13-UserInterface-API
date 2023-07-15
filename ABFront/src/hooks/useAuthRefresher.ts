/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../hooks/redux"
import { useEffect } from "react"
import { setCredentials } from "../redux/features/auth/authSlice"
import cookiesManager from "../services/cookiesManager"

function useAuthRefresher(){

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const logged : boolean = useTypedSelector((state) => state.auth.logged)
    const token : string | null = useTypedSelector((state) => state.auth.token)

    useEffect(()=> {
        if (token!=null) return
        const {cookieEmailValue, cookieTokenValue} = {cookieEmailValue : cookiesManager.getEmail(), cookieTokenValue : cookiesManager.getToken()}
        // sets logged back to true + state token if the cookies are populated & the state has been lost due to some page refresh
        if (cookieEmailValue!==null && cookieTokenValue!==null) 
        {
            dispatch(setCredentials({email : cookieEmailValue, token : cookieTokenValue}))
            if (logged === true) navigate("/profile")
        }
    }, [logged])
}

export default useAuthRefresher