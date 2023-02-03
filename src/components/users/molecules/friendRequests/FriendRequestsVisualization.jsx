import IconButton from '@mui/material/IconButton'
import PersonIcon from '@mui/icons-material/Person'
import Popover from '@mui/material/Popover'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import _ from 'underscore'

import { useState, useEffect } from 'react'

import axios from '../../../../api/axios'
import { Typography } from '@mui/material'

const GET_REQUESTS_URL = 'controllers/user/friendRequests'
const DELETE_REQUEST_URL = 'controllers/user/friendRequests/delete'
const ACCEPT_REQUEST_URL = 'controllers/user/friendRequests/accept'


const FriendRequestsVisualization = (props) => {
    const token = localStorage.getItem('token')

    const [friendRequests, setFriendRequests] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)

    const fetchFriendRequests = async () => {
        axios.get(
            GET_REQUESTS_URL,
            {
                headers: {
                    "Authorization": token
                }
            }
        ).then((res) => {
            setFriendRequests(res?.data)
        }).catch(console.log)
    }

    useEffect(() => {
        fetchFriendRequests()
    }, [])

    const handleRequestRefused = (request) => {
        axios.delete(
            DELETE_REQUEST_URL,
            {
                headers: {
                    "Authorization": token
                },
                data: request
            }
        ).then(() => {
            fetchFriendRequests()
        }).catch(console.log)
    }

    const handleRequestAccepted = (request) => {
        axios.post(
            ACCEPT_REQUEST_URL,
            request,
            {
                headers: {'Content-Type': 'application/json', 'Authorization': token}
            }
        ).then(() => {
            fetchFriendRequests()
        }).catch(console.log)
    }

    const handleRequestsClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleRequestsClose = () => {
        setAnchorEl(null)
    }

    return(
        <>
            <IconButton onClick={handleRequestsClick}>
                <Badge 
                    badgeContent={friendRequests.length} 
                    color="secondary"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                >
                    <PersonIcon style={{fill: 'white'}}/>
                </Badge>
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleRequestsClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {friendRequests.length > 0?
                <List sx={{ width: '300px'}}>
                {
                    _.map(friendRequests, (request) => {
                        return (
                            <ListItem 
                                secondaryAction={
                                    <>
                                        <IconButton edge="end" aria-label="comments" onClick={() => {handleRequestAccepted(request)}}>
                                            <DoneIcon/>
                                        </IconButton>
                                        <IconButton edge="end" aria-label="comments" onClick={() => {handleRequestRefused(request)}}>
                                            <ClearIcon/>
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={request.fromUserInfo.username}
                                    secondary={request.fromUserInfo.email}
                                />
                            </ListItem>
                        )
                    })
                }
            </List>
            :
            <Box
                display='flex'
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{width: 300, marginTop: 2, marginBottom: 2}}
            >
                <Typography>Nenhum pedido de amizade</Typography>
            </Box>
            }
            </Popover>
        </>
    )
}

export default FriendRequestsVisualization