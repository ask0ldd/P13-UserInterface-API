import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function CustomRouter {
    return(
        <Router basename="/P13-UserInterface-API/ABFront/">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default CustomRouter