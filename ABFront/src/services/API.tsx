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

    // POST : Login Process
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
                // only needs to return success message instead of this
                return {email: email, token: token}
                // window.location.href = "index.html" replace with react programmatic nav
            }
            else
            {
                switch(response.status)
                { // soutenance : error code from swagger
                    case 400:
                        return {error : "Invalid Fields."}
                    break;
                    default:
                        return {error : "Internal Server Error."}
                }
            }
        }
        catch
        {
            console.error("Service Unavailable. Retry Later.")
            return {error : "Service Unavailable. Retry Later."}
        }
        finally{
            store.dispatch(setAPIIdle())
        }
    }

    // GET : Logged User's Profile
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
                return {id, email, firstname, lastname}
            }
            else
            {
                switch(response.status)
                {   case 400:
                        return {error : "Invalid Fields."}
                    break;
                    default:
                        console.log(response.statusText)
                        return {error : "Internal Server Error."}
                }
            }
        }
        catch
        {
            console.error("Service Unavailable. Retry Later.")
            return {error : "Service Unavailable. Retry Later."}
        }
        finally{
            store.dispatch(setAPIIdle())
        }
    }

    // PUT : Update User Names
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
                return {id : userDatas.body.id, email : userDatas.body.email}
            }
            else
            {
                switch(response.status)
                {
                    case 400:
                        return {error : "Invalid Fields."}
                    break;
                    default:
                        return {error : "Internal Server Error."}
                }
            }
        }
        catch
        {
            console.error("Service Unavailable. Retry Later.")
            return {error : "Service Unavailable. Retry Later."}
        }
        finally{
            store.dispatch(setAPIIdle())
        }
    }

}

// Mock API serving the accounts datas used on the user's page
export class MockAPIAccounts{
    static async getAccounts(){
        try{
            const response = await fetch('/accounts.json')
            if(response.ok){
                const accountDatas = await response.json()
                return accountDatas
            }
        }
        catch(error){
            console.log(error)
        }
    }
}