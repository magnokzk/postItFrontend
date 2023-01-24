import React from 'react'
import Header from './HeaderComponent'
import HomeFeed from '../home/HomeFeedComponent'
import Login from '../login/LoginComponent'
import About from '../about/AboutComponent'
import Register from '../register/RegisterComponent'
import ProfileView from '../profile/ProfileView'

import { useContext, useState } from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import _ from 'underscore'
import axios from '../../api/axios'

const routes = [
    {
        path: '/',
        component: <HomeFeed/>,
        requireAuth: true
    },
    {
        path: '/login',
        component: <Login/>,
        requireAuth: false
    },
    {
        path: '/profile/:userId',
        component: <ProfileView/>,
        requireAuth: true,
    },
    {
        path: '/register',
        component: <Register/>,
        requireAuth: false
    },
    {
        path: '/sobre',
        component: <About/>,
        requireAuth: false
    }
]

function Main(){
    const token = localStorage.getItem('token')

    const { auth, setAuth } = useContext(AuthContext)
    const [isUserValidated, setIsUserValidated] = useState(!token??false)

    if(token != null && auth.id == null){
        axios.get('/controllers/user', {headers: {"Authorization": token}})
            .then((res) => {
                setAuth({...auth, id: res?.data.id})
            })
            .catch(() => {
                localStorage.removeItem('token')
            })
            .finally(() => {
                setIsUserValidated(true)
            })
    }

    const renderRoutes = () => {
        return (
            _.map(routes, (route) => {
                if(route.requireAuth && auth.id == null){
                    return (<Route
                        path={route.path}
                        element={<Navigate to='/login' replace/>}
                    />)
                }
    
                return (
                    <Route 
                        path={route.path} 
                        element={route.component}
                    />
                )
            })
        )
    }

    return(
        <>
            {
                isUserValidated 
                    &&
                <BrowserRouter>
                    {auth.id? <Header/>: <></>}
                    <Routes>
                        {renderRoutes()}
                    </Routes>
                </BrowserRouter>
            }
        </>
    )
}

export default Main