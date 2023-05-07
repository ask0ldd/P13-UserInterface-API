interface logs {
    email : string
    password : string
}

const api = "localhost:3001/api/v1/"

class API{
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
                document.cookie = `email=${email}; Secure`
                document.cookie = `token=${userDatas.token}; Secure`
                window.location.href = "index.html" // change destination
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

export default API