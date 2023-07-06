export default class Validator{

    static testName(value: string) : boolean {
        const nameRegex = new RegExp ("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$")
        return nameRegex.test(value.trim())
    }

    static testEmail(value: string) : boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(value.trim())
    }

    static testPassword(value: string) : boolean {
        const passwordRegex = /^[a-zA-Z0-9*.!@#$%^&(){}:;,._]{6,}$/
        return passwordRegex.test(value.trim())
    }
}