import {useState} from 'react'
import { Link } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import axios from '../../api/axios'
import { TextField } from '@mui/material';
const REGISTER_URL = 'controllers/user/register'

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Register = () => {

    const [loading, setLoading] = useState(false)

    const [userName, setUserName] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState(null)
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')


    const handleClick = async () => {
        try {

            console.log({
                userName: userName,
                name: name,
                surname: surname,
                birthDate: birthDate,
                email: email,
                password: pwd
            })

            setLoading(true)

            if(errMsg.length > 0) {
                setErrMsg('')
            }

            await axios.post(REGISTER_URL,
                JSON.stringify({
                    userName: userName,
                    name: name,
                    surname: surname,
                    birthDate: birthDate,
                    email: email,
                    password: pwd
                }),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )

            return (<Link to="/"/>)
        } catch (err) {
            setErrMsg('Não foi possível realizar o cadastro! Tente novamente mais tarde!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Box
                spacing={0}
                display='flex'
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    marginTop: 5
                }}
            >
                <Typography variant='h3'>Cadastro</Typography>
            </Box>
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

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2}}>
                    <Grid item xs={12} sm={6}>
                        <Item>
                            <TextField
                                id="userName"
                                label="Login"
                                type="text"
                                variant="standard"
                                sx={{width: '100%'}}
                                onChange={e => setUserName(e.target.value)}
                                value={userName}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Item>
                            <TextField
                                id="password"
                                label="Senha"
                                type="password"
                                variant="standard"
                                sx={{width: '100%'}}
                                onChange={e => setPwd(e.target.value)}
                                value={pwd}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Item>
                            <TextField
                                id="name"
                                label="Nome"
                                type="text"
                                variant="standard"
                                sx={{width: '100%'}}
                                onChange={e => setName(e.target.value)}
                                value={name}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Item>
                            <TextField
                                id="surname"
                                label="Sobrenome"
                                type="text"
                                variant="standard"
                                sx={{width: '100%'}}
                                onChange={e => setSurname(e.target.value)}
                                value={surname}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Item>
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                variant="standard"
                                sx={{width: '100%'}}
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Item>
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                variant="standard"
                                onChange={e => setBirthDate(e.target.value)}
                                value={birthDate}
                                sx={{width: '100%'}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Item>
                    </Grid>
                </Grid>
                <Box
                    display='flex'
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    m={2}
                >
                    <Button 
                        component={Link}
                        to="/"
                    >
                        Logar
                    </Button>
                    <LoadingButton
                        loading={loading}
                        onClick={handleClick}
                        variant="contained"
                        sx={{marginLeft: 5}}
                    >
                        Cadastrar
                    </LoadingButton>
                </Box>
            </Container>
        </>
    )
}

export default Register