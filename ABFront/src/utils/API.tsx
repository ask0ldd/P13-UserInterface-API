import { setAPIAtWork, setAPIIdle } from "../redux/features/auth/authSlice"
import store from "../redux/store"

export interface ICredentials {
    email : string
    password : string
}

export interface INames {
    firstName : string
    lastName : string
}

const api = "http://127.0.0.1:3001/api/v1/"

export class API{

    static async login({email, password} : ICredentials){
        try{
            store.dispatch(setAPIAtWork())
            const response = await fetch(`${api}user/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})      
            })

            if(response.ok && response.status === 200)
            {
                const userDatas = await response.json()
                const token = userDatas.body.token
                store.dispatch(setAPIIdle())
                // only needs to return success message instead of this
                return {email: email, token: token}
                // window.location.href = "index.html" replace with react programmatic nav
            }
            else
            {
                switch(response.status)
                { // change error code : cf swagger
                    case 404:
                        store.dispatch(setAPIIdle())
                        // console.log(response.statusText)
                        return {error : "User not found."}
                    break;
                    case 401:
                        store.dispatch(setAPIIdle())
                        // console.log(response.statusText)
                        return {error : response.statusText}
                    break;
                    default:
                        store.dispatch(setAPIIdle())
                        // console.log(response.statusText)
                        return {error : response.statusText}
                }
            }
        }
        catch
        {
            store.dispatch(setAPIIdle())
            return {error : "Service Unavailable. Retry Later."}
        }
    }

    static async getProfile(){
        try{
            store.dispatch(setAPIAtWork())
            if(!store.getState().auth.token) throw new Error("The global state contains no token.")
            const response = await fetch(`${api}user/profile`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${store.getState().auth.token}`
                }     
            })

            if(response.ok && response.status === 200)
            {
                const userDatas = await response.json()
                const id = userDatas.body.id
                const email = userDatas.body.email
                const firstname = userDatas.body.firstName
                const lastname = userDatas.body.lastName
                store.dispatch(setAPIIdle())
                return {id, email, firstname, lastname}
            }
            else
            {
                switch(response.status)
                { // change error code : cf swagger
                    case 404:
                        store.dispatch(setAPIIdle())
                        console.log(response.statusText)
                        return {error : "User not found."}
                    break;
                    case 401:
                        store.dispatch(setAPIIdle())
                        console.log(response.statusText)
                        return {error : response.statusText}
                    break;
                    default:
                        store.dispatch(setAPIIdle())
                        console.log(response.statusText)
                        return {error : response.statusText}
                }
            }
        }
        catch
        {
            store.dispatch(setAPIIdle())
            return {error : "Service Unavailable. Retry Later."}
        }
    }

    static async updateNames({firstName, lastName} : INames){
        try{
            store.dispatch(setAPIAtWork())
            const response = await fetch(`${api}user/profile`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.getState().auth.token}`
                },
                body: JSON.stringify({firstName, lastName})      
            })

            if(response.ok && response.status === 200)
            {
                const userDatas = await response.json()
                store.dispatch(setAPIIdle())
                return {id : userDatas.body.id, email : userDatas.body.email}
            }
            else
            {
                switch(response.status)
                {
                    case 400:
                        store.dispatch(setAPIIdle())
                        console.error("Invalid Fields.")
                        return {error : "Invalid Fields."}
                    break;
                    case 500:
                        store.dispatch(setAPIIdle())
                        console.error("Internal Server Error.")
                        return {error : "Internal Server Error."}
                    break;
                    default:
                        store.dispatch(setAPIIdle())
                }
            }
        }
        catch
        {
            store.dispatch(setAPIIdle())
            console.error("Service Unavailable. Retry Later.")
            return {error : "Service Unavailable. Retry Later."}
        }
    }

}