/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../hooks/redux"
import { useEffect } from "react"
import { setCredentials } from "../redux/features/auth/authSlice"
import cookiesManager from "../services/cookiesManager"

// if the state has been lost due to some page refresh && cookies still populated => sets credentials & logged back into the state
function useAuthRefresher(){

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const logged : boolean = useTypedSelector((state) => state.auth.logged)
    const token : string | null = useTypedSelector((state) => state.auth.token)

    useEffect(()=> {
        if (token!=null && logged!==false) return

        const {cookieEmailValue, cookieTokenValue} = {cookieEmailValue : cookiesManager.getEmail(), cookieTokenValue : cookiesManager.getToken()}
        if (cookieEmailValue!==null && cookieTokenValue!==null) 
        {
            dispatch(setCredentials({email : cookieEmailValue, token : cookieTokenValue}))
        }
        if (logged === true) navigate("/profile")
    }, [logged, token])

}

export default useAuthRefresher