import '../../style/Features/Icon.css'

interface props {
    url : string
}

function Icon({url} : props) {
    return(
        <img className="feature-icon" src={url}/>
    )
}

export default Icon