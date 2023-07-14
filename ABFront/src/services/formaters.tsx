class Formatter{
    static amountWithColons(amount : string) : string {
        const splitAmount = `${amount}`.split('.')
        const reversedIntPartWithColons = reverseString(splitAmount[0]).replace(new RegExp(`.{3}`, 'g'), '$&' + ',')
        const IntPartWithColons = reverseString(reversedIntPartWithColons)
        splitAmount[0] = IntPartWithColons.replace(/^,+|,+$/g, '')
        return splitAmount[0] + '.'+splitAmount[1]
    }

    static firstCharMaj(word : string){
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
}

function reverseString(str : string){
    return str.split('').reverse().join('')
}

export default Formatter