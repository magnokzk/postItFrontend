import {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthProvider'
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
            console.log(JSON.stringify(response?.data))
            setAuth({user, pwd})
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
                <section>
                    <h1>Você está logado!</h1>
                    <br/>
                    <p>
                        <Link to="/">Voltar para a página inicial</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg? "errmsg" :
                    "offscreen"} aria-live="asserrtive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username:</label>
                        <input 
                            type="text" 
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        /><br></br>
                        <label htmlFor='password'>Password:</label>
                        <input 
                            type="password" 
                            id="password"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign in</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default Login