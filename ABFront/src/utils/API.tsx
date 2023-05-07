interface logs {
    email : string
    password : string
}

const api = "http://127.0.0.1:3001/api/v1/"

export class API{
    static async login({email, password} : logs){
        try{
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
                document.cookie = `email=${email}; Secure`
                document.cookie = `token=${token}; Secure`
                // window.location.href = "index.html"
            }
            else
            {
                switch(response.status)
                { // change error code : cf swagger
                    case 404:
                        console.log(response.statusText)
                        return {error : "User not found."}
                    break;
                    case 401:
                        console.log(response.statusText)
                        return {error : response.statusText}
                    break;
                    default:
                        console.log(response.statusText)
                        return {error : response.statusText}
                }
            }
        }
        catch
        {
            return {error : "Service Unavailable. Retry Later."}
        }
    }
}