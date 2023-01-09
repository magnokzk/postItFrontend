import React from 'react'
import Header from './HeaderComponent'
import HomeFeed from '../home/HomeFeedComponent'
import Login from '../login/LoginComponent'
import About from '../about/AboutComponent'
import Register from '../register/RegisterComponent'
import ProfileView from '../profile/ProfileView'

import { useContext } from 'react'
import {BrowserRouter ,Route, Routes,} from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import _ from 'underscore'
import axios from '../../api/axios'

function Main(){
    const { auth, setAuth } = useContext(AuthContext)
    const token = localStorage.getItem('token')

    if(token != null && auth.id == null){
        axios.get('/controllers/user', {headers: {"Authorization": token}})
            .then((res) => {
                setAuth({...auth, id: res?.data.id})
            })
            .catch(() => {
                localStorage.removeItem('token')
            })
    }

    return(
        <BrowserRouter>
            {auth.id != null? <Header/>: <></>}
            <Routes>
                <Route path="/" element={_.isUndefined(auth.id)? <Login/>: <HomeFeed/>}/>
                <Route path="/profile/:userId" element={<ProfileView/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/sobre" element={<About/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Main