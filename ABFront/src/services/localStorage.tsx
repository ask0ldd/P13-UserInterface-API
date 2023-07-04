const localStorage = {

    setAuthCookies : (email : string, token : string) => {
        document.cookie = `email=${email}; Secure`
        document.cookie = `token=${token}; Secure`
    },

    unsetAuthCookies : () => {
        document.cookie = `email=; Secure`
        document.cookie = `token=; Secure`
    }
}

export default localStorage