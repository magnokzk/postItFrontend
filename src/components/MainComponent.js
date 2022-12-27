import React from 'react'
import Header from './HeaderComponent'
import HomeFeed from './HomeFeedComponent'
import Login from './LoginComponent'
import About from './AboutComponent'

import { useContext } from 'react'
import {BrowserRouter ,Route, Routes,} from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import _ from 'underscore'
import axios from '../api/axios'

function Main(){
    const { auth, setAuth } = useContext(AuthContext)
    const token = localStorage.getItem('token')

    if(token != null && auth.id == null){
        axios.get('/controllers/user', {headers: {"Authorization": token}})
            .then((res) => {
                setAuth({...auth, id: res?.data.id})
            })
    }

    return(
        <BrowserRouter>
            {auth.id != null? <Header/>: <></>}
            <Routes>
                <Route path="/" element={_.isUndefined(auth.id)? <Login/>: <HomeFeed/>}/>
                <Route path="/sobre" element={<About/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Main