import {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthProvider'
import HomeFeed from './HomeFeedComponent'
import {Link} from 'react-router-dom'

import axios from '../api/axios'
const LOGIN_URL = 'controllers/auth'

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({username: user, password: pwd}),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
            console.log({user, pwd, id: response?.data.id})
            setAuth({user, pwd, id: response?.data.id})
            setSuccess(true)
        } catch (err) {
            if(!err?.response){
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400){
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401){
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }
    }

    return (
        <>
            {success? (
                <HomeFeed/>
            ) : (
                <>
                    <div class="container mt-4 mb-5">
                        <div class="justify-content-center col-md-12 d-flex align-items-center">
                            <form onSubmit={handleSubmit} class="border rounded p-5">
                                {errMsg.length > 0? 
                                    <div class="alert alert-danger" role="alert">
                                        {errMsg}
                                    </div> : ""
                                }
                                <div class="form-outline">
                                    <input                 
                                        type="text" 
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        required
                                        class="form-control" />
                                    <label class="form-label" for="username">Nome de usuário</label>
                                </div>

                                <div class="form-outline">
                                    <input 
                                        type="password" 
                                        id="password"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                    class="form-control" />
                                    <label class="form-label" for="password">Senha</label>
                                </div>

                                <div class="row">
                                    <div class="col d-flex justify-content-center">
                                        <div class="col">
                                        <a href="#!">Esqueceu sua senha?</a>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4">Entrar</button>

                                <div class="text-center">
                                    <p>Não está cadastrado? <a href="#!">Registre-se</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Login