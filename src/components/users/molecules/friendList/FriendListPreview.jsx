import { useEffect, useState } from 'react';

import { 
    Avatar, 
    Grid, 
    Box, 
    Typography,
    Paper,
    Button
} from '@mui/material'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

import _ from 'underscore'

const FriendPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto'
  }))

const FriendListPreview = (props) => {
    const fullFriendList = props.friendList
    const compactFriendList = fullFriendList.slice(0, 4)
    
    const [showMore, setShowMore] = useState(false)

    const handleShowMore = () => {
        setShowMore(!showMore)
    }

    return(
        <Grid container spacing={2} columns={12}>
            <Grid item xs={12}>
                <Box
                    spacing={0}
                    display='flex'
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant='h6'>Friend List</Typography>
                </Box>
            </Grid>
            {
                _.map(showMore? fullFriendList: compactFriendList, (friend, index) => {
                    return (
                        <Grid item xs={6} style={{textDecoration: 'none'}} component={Link} to={`/profile/${friend.friendInfo.id}`}>
                            <FriendPaper>
                                <Box
                                    spacing={0}
                                    display='flex'
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Avatar/>
                                </Box>
                                <Box
                                    spacing={0}
                                    display='flex'
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Typography>{friend.friendInfo.username}</Typography>
                                </Box>
                            </FriendPaper>
                        </Grid>
                    )
                })
            }
            {
                (fullFriendList.length > 4) && 
                <Grid item xs={12}>
                    <Box
                        spacing={0}
                        display='flex'
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button onClick={() => {handleShowMore()}} endIcon={showMore? <ExpandLessIcon/>: <ExpandMoreIcon/>}>
                            {showMore? 'Less': 'More'}
                        </Button>
                    </Box>
                </Grid>
            }
        </Grid>
    )
}

export default FriendListPreview