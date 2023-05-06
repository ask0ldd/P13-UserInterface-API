import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'

function CustomRouter() {
    /*<Router basename="/P13-UserInterface-API/ABFront/"> needs to add basename into vite config*/
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default CustomRouter