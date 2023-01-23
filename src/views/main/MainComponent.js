import React from 'react'
import Header from './HeaderComponent'
import HomeFeed from '../home/HomeFeedComponent'
import Login from '../login/LoginComponent'
import About from '../about/AboutComponent'
import Register from '../register/RegisterComponent'
import ProfileView from '../profile/ProfileView'

import { useContext } from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import _ from 'underscore'
import axios from '../../api/axios'

const routes = [
    {
        path: '/',
        component: <HomeFeed/>,
        secondComponent: <Login/>,
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
                {
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
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Main