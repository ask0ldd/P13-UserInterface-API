// import store from "../redux/store" 
// base of the cycling dependencies

export interface ICredentials {
    email : string
    password : string
    persistent : boolean
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
                console.log(response.statusText)
                return {email: null, token: null}
            }
        }
        catch(error)
        {
            console.error("Service Unavailable. Retry Later.")
            return {email: null, token: null}
        }
    }

    // GET : Logged User's Profile
    static async getProfile(token : string){
        try{
            // store.dispatch(setAPIAtWork())
            if(!token) throw new Error("The global state contains no token.")
            const response = await fetch(`${api}user/profile`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
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
                console.log(response.statusText)
                return {id : null, email : null, firstname : null, lastname : null}
            }
        }
        catch
        {
            console.error("Service Unavailable. Retry Later.")
            return {id : null, email : null, firstname : null, lastname : null}
        }
    }

    // PUT : Update User Names
    static async updateNames({firstName, lastName} : INames, token : string){
        try{
            const response = await fetch(`${api}user/profile`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({firstName, lastName})      
            })

            if(response.ok && response.status === 200)
            {
                const userDatas = await response.json()
                return {id : userDatas.body.id, email : userDatas.body.email, firstname : firstName, lastname : lastName}
            }
            else
            {
                console.log(response.statusText)
                return {id : null, email : null, firstname : null, lastname : null}
            }
        }
        catch
        {
            console.error("Service Unavailable. Retry Later.")
            return {id : null, email : null, firstname : null, lastname : null}
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