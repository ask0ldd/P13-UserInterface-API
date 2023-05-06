import Header from "../components/Header"
import Footer from "../components/Footer"
import '../style/User.css'

function User(){
    return(
        <div className='App'>
        <Header/>
        <main className='main-user'>
            <h1 className="h1-user">Welcome back<br/>Tony Jarvis!</h1>
            <button className="edit-button">Edit Name</button>
        </main>
        <Footer/>
      </div>        
    )
}

export default User