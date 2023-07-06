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
        const blankLoginResponse = {email: null, token: null}
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
                return {email: email, token: token, failed : false}
            }
            else
            {
                console.log(response.statusText)
                return {...blankLoginResponse, failed : true}
            }
        }
        catch(error)
        {
            console.error("Service Unavailable. Retry Later.")
            return {...blankLoginResponse, failed : true}
        }
    }

    // GET : Logged User's Profile
    static async getProfile(token : string){
        const blankGetProfileResponse = {id : null, email : null, firstname : null, lastname : null}
        try{
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
                return blankGetProfileResponse
            }
        }
        catch
        {
            console.error("Service Unavailable. Retry Later.")
            return blankGetProfileResponse
        }
    }

    // PUT : Update User Names
    static async updateNames({firstName, lastName} : INames, token : string){

        const blankUpdatesNamesReponse = {id : null, email : null, firstname : null, lastname : null}

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
                return {id : userDatas.body.id, email : userDatas.body.email, firstname : firstName, lastname : lastName, failed : false}
            }
            else
            {
                console.log(response.statusText)
                return {...blankUpdatesNamesReponse, failed : true}
            }
        }
        catch
        {
            console.error("Service Unavailable. Retry Later.")
            return {...blankUpdatesNamesReponse, failed : true}
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
            return []
        }
    }
}