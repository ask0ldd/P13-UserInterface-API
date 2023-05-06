import Feature from "./Feature"
import '../../style/Features/Features.css'

const featuresContent = [
    {
        icon : 'icons/icon-chat.png',
        heading : 'You are our #1 priority',
        subtitle : 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
        icon : 'icons/icon-money.png',
        heading : 'More savings means higher rates',
        subtitle : 'The more you save with us, the higher your interest rate will be!',
    },
    {
        icon : 'icons/icon-security.png',
        heading : 'Security you can trust',
        subtitle : 'We use top of the line encryption to make sure your data and money is always safe.',
    },
]

function Features() {
    return(
        <section className="features-section">
            <Feature icon={featuresContent[0].icon} heading={featuresContent[0].heading} subtitle={featuresContent[0].subtitle} />
            <Feature icon={featuresContent[1].icon} heading={featuresContent[1].heading} subtitle={featuresContent[1].subtitle} />
            <Feature icon={featuresContent[2].icon} heading={featuresContent[2].heading} subtitle={featuresContent[2].subtitle} />
        </section>
    )
}

export default Features