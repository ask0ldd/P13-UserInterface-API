const cookiesManager = {

    setAuthCookies : (email : string, token : string) => {
        document.cookie = `email=${email}; Secure`
        document.cookie = `token=${token}; Secure`
    },

    unsetAuthCookies : () => {
        document.cookie = "email=; Max-Age=0;"
        document.cookie = "token=; Max-Age=0;"
    }
}

export default cookiesManager