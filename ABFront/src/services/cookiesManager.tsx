const cookiesManager = {

    setAuthCookies : (email : string, token : string) => {
        document.cookie = `email=${email}; Secure`
        document.cookie = `token=${token}; Secure`
    },

    unsetAuthCookies : () => {
        document.cookie = "email=; Max-Age=0;"
        document.cookie = "token=; Max-Age=0;"
    },

    getToken : () => {   
        const token = document.cookie.split('; ').find((cookie) => cookie.startsWith('token='))?.split('=')[1]
        return token !== undefined ? token : false
    },

    getEmail : () => {   
        const email = document.cookie.split('; ').find((cookie) => cookie.startsWith('email='))?.split('=')[1]
        return email !== undefined ? email : false
    }
}

export default cookiesManager