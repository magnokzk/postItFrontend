import React from 'react'
import Header from './HeaderComponent'
import Footer from './FooterHeader'
import HomeFeed from './HomeFeedComponent'
import Login from './LoginComponent'
import About from './AboutComponent'

import {BrowserRouter ,Route, Routes} from 'react-router-dom'

function Main(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/sobre" element={<About/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Main