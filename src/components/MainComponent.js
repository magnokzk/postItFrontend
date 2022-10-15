import React from 'react'
import Header from './HeaderComponent'
import Footer from './FooterHeader'
import HomeFeed from './HomeFeedComponent'
import Login from './LoginComponent'
import About from './AboutComponent'

import { useContext } from 'react'
import {BrowserRouter ,Route, Routes,} from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import _ from 'underscore'

function Main(){
    const { auth } = useContext(AuthContext)

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={_.isUndefined(auth.id)? <Login/>: <HomeFeed/>}/>
                <Route path="/sobre" element={<About/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Main