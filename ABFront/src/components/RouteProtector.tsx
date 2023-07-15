/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { useTypedSelector } from "../hooks/redux"


function RouteProtector(){

    const navigate = useNavigate()
    const logged : boolean = useTypedSelector((state) => state.auth.logged)
    const token : string | null = useTypedSelector((state) => state.auth.token)
    

    useEffect(() => {
        if (logged === false || token == null) navigate("/")
    }, [logged])

    if (logged === false || token == null) return(<Navigate to="/" replace={true}/>)

    return(<></>)
}

export default RouteProtector