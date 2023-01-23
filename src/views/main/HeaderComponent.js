import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'

import * as React from 'react'
import Axios from 'axios'
import api from '../../api/axios'
import Divider from '@mui/material/Divider'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'
import AdbIcon from '@mui/icons-material/Adb'
import Popover from '@mui/material/Popover'
import { deepOrange } from '@mui/material/colors'

import UserList from '../../components/users/UserListComponent'

const pages = [
    {
        value: "Página Inicial",
        route: "/"
    }
]

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

function Header(){
  
    const {auth, setAuth} = useContext(AuthContext)
    const [search, setSearch] = React.useState('')
    const [searchResults, setSearchResults] = React.useState([])
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [anchorElUserList, setAnchorElUserList] = React.useState(null)

    React.useEffect(() => {
      if(!(search?.target?.value)) {
        setSearchResults([])
        setAnchorElUserList(null)
        return
      }

      const ourRequest = Axios.CancelToken.source()
      api.post(`controllers/user/findByName`, 
        {
          username: search?.target?.value
        },
        {
          cancelToken: ourRequest.token,
          headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')}
        }
      ).then((res) => {
        console.log(res.data)
        setAnchorElUserList(search.target)
        setSearchResults(res?.data)
      }).catch((err) => {
        console.log(err)
      })
      
      return () => {
        ourRequest.cancel()
      }
    }, [search])

    const handleUserListClose = () => {
      setAnchorElUserList(null)
    }

    const handleLogoutClick = () => {
        handleCloseUserMenu()
        localStorage.removeItem('token')
        setAuth({})
    }

    const handleProfileClick = () => {
        handleCloseUserMenu()
    }
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget)
    }
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null)
    }
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null)
    }
  
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              POSTIT
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.value} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" component={Link} sx={{textDecoration: 'none', color: 'black'}} to={page.route}>{page.value}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                pr: 2,
                display: { xs: 'none', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.01rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              POSTIT
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.value}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', textDecoration: "none", textDecorationColor: "black" }}
                  component={Link} 
                  to={page.route}
                >
                  {page.value}
                </Button>
              ))}
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar usuário..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={setSearch}
              />
              <Popover
                open={Boolean(anchorElUserList)}
                anchorEl={anchorElUserList}
                onClose={handleUserListClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                disableAutoFocus={true}
                disableEnforceFocus={true}
              >
                <UserList 
                  items={searchResults} 
                  callback={handleUserListClose}
                />
              </Popover>
            </Search>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: deepOrange[500]}}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={"Perfil"} onClick={handleProfileClick} component={Link} to={`/profile/${auth.id}`}>
                    <Typography textAlign="center">Perfil</Typography>
                </MenuItem>
                <Divider/>
                <MenuItem key={"Sair"} onClick={handleLogoutClick}>
                    <Typography textAlign="center">Sair</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
}

export default Header