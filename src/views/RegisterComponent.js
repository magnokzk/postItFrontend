import {useState} from 'react'
import  { Navigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import axios from '../api/axios'
const REGISTER_URL = 'controllers/user/register'

const Register = () => {

    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')


    const handleClick = async () => {
        try {
            setLoading(true)

            if(errMsg.length > 0) {
                setErrMsg('')
            }

            await axios.post(REGISTER_URL,
                JSON.stringify({username: user, password: pwd, email: email}),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            ).then((res) => {
                setRedirect(true)
            })
        } catch (err) {
            setErrMsg('Não foi possível realizar o cadastro! Tente novamente mais tarde!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {redirect? <Navigate to="/"/>: <></>}
            <Container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                maxWidth='sm'
                fixed
                sx={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    marginTop: 5,
                    border: 1.5,
                    borderRadius: 2,
                    borderColor: 'grey.300'
                }}
                >
                <Box
                    spacing={0}
                    display='flex'
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant='h3'>Cadastro</Typography>
                </Box>

                {errMsg.length > 0?
                    <Box
                        spacing={0}
                        display='flex'
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Alert severity="error" >{errMsg}</Alert>
                    </Box>
                : <></>}

                <Box
                    spacing={1}
                    display='flex'
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <FormControl variant="standard">
                        <InputLabel htmlFor="component-helper">Nome do usuário</InputLabel>
                        <Input
                            id="txt_username"
                            onChange={e => setUser(e.target.value)}
                        />
                    </FormControl>
                </Box>
                <Box
                    spacing={1}
                    display='flex'
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <FormControl variant="standard">
                            <InputLabel htmlFor="component-helper">Email</InputLabel>
                            <Input
                                id="txt_email"
                                type='email'
                                onChange={e => setEmail(e.target.value)}
                            />
                    </FormControl>
                </Box>
                <Box
                    spacing={1}
                    display='flex'
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <FormControl variant="standard">
                            <InputLabel htmlFor="component-helper">Senha</InputLabel>
                            <Input
                                id="txt_password"
                                type='password'
                                onChange={e => setPwd(e.target.value)}
                            />
                    </FormControl>
                </Box>
                <Box
                    display='flex'
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    m={2}
                >
                    <LoadingButton
                        loading={loading}
                        onClick={handleClick}
                        variant="contained"
                        sx={{marginRight: 5}}
                    >
                        Cadastrar
                    </LoadingButton>
                    <Button 
                        variant="text"
                        href='/'
                    >
                        Logar
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default Register