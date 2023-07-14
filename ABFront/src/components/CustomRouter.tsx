import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import User from '../pages/User'
import EditName from '../pages/EditName'

function CustomRouter() {
    /*<Router basename="/P13-UserInterface-API/ABFront/"> needs to add basename into vite config*/
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<User />} />
                <Route path="/editname" element={<EditName />} />
            </Routes>
        </Router>
    )
}

export default CustomRouter