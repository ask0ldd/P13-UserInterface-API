
interface props {
    icon : string
    heading : string
    subtitle : string
}

function Feature({icon, heading, subtitle} : props) {
    return(
        <article>
            <img src={icon}/>
            <h3>{heading}</h3>
            <p>{subtitle}</p>
        </article>
    )
}

export default Feature