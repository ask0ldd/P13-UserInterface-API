import '../../style/Features/Feature.css'
import Icon from './Icon'

interface props {
    icon : string
    heading : string
    subtitle : string
}

function Feature({icon, heading, subtitle} : props) {
    return(
        <article className='feature-article'>
            <Icon url={icon}/>
            <h3 className='feature-heading'>{heading}</h3>
            <p className='feature-subtitle'>{subtitle}</p>
        </article>
    )
}

export default Feature