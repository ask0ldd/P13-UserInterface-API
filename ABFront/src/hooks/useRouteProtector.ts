/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTypedSelector } from "../hooks/redux"
import cookiesManager from "../services/cookiesManager"


function useRouteProtector(){

    const navigate = useNavigate()
    const logged : boolean = useTypedSelector((state) => state.auth.logged)
    const token : string | null = useTypedSelector((state) => state.auth.token)
    const cookiesToken = cookiesManager.getToken()
    
    useEffect(() => {
        if (logged === false && token == null && cookiesToken == null) navigate("/")
    }, [logged, token])

    if (logged === false && token == null && cookiesToken == null) navigate("/")
    
}

export default useRouteProtector