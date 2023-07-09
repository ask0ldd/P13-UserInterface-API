class Formatter{
    static amount(amount : string) : string {
        const splitAmount = `${amount}`.split('.')
        splitAmount[0].replace(/(.{4})/g,",")
        return splitAmount[0]+'.'+splitAmount[1]
    }

    static firstCharMaj(word : string){
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
}

export default Formatter