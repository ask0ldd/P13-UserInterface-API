import Feature from "./Feature"

const featuresContent = [
    {
        icon : '../../assets/icon-chat.png',
        heading : 'You are our #1 priority',
        subtitle : 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
        icon : '../../assets/icon-money.png',
        heading : 'You are our #1 priority',
        subtitle : 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
        icon : '../../assets/icon-security.png',
        heading : 'You are our #1 priority',
        subtitle : 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
]

function Features() {
    return(
        <section>
            <Feature icon={featuresContent[0].icon} heading={featuresContent[0].heading} subtitle={featuresContent[0].subtitle} />
            <Feature icon={featuresContent[1].icon} heading={featuresContent[1].heading} subtitle={featuresContent[1].subtitle} />
            <Feature icon={featuresContent[1].icon} heading={featuresContent[2].heading} subtitle={featuresContent[2].subtitle} />
        </section>
    )
}

export default Features