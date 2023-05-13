import { setAPIAtWork, setAPIIdle } from "../redux/features/auth/authSlice"
import store from "../redux/store"

interface ICredentials {
    email : string
    password : string
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

            if(response.ok)
            {
                const userDatas = await response.json()
                const token = userDatas.body.token
                console.info(userDatas.message)
                document.cookie = `email=${email}; Secure`
                document.cookie = `token=${token}; Secure`
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

    static async getProfile(token : string){
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

            if(response.ok)
            {
                const userDatas = await response.json()
                const id = userDatas.body.id
                const email = userDatas.body.email
                console.info(userDatas)
                /*document.cookie = `email=${email}; Secure`
                document.cookie = `token=${token}; Secure`
                store.dispatch(setAPIIdle())*/
                // return {id, email}
                store.dispatch(setAPIIdle())
                return {id, email}
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

}