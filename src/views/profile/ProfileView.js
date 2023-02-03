import React from 'react'

import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import PostView from '../../components/posts/PostViewComponent'
import FriendListPreview from '../../components/users/molecules/friendList/FriendListPreview'
import _ from 'underscore'
import axios from '../../api/axios'

import { styled } from '@mui/material/styles'
import { deepOrange } from '@mui/material/colors'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

import { 
    IconButton, 
    Avatar, 
    Container, 
    Grid, 
    Paper, 
    Box, 
    Typography
} from '@mui/material'

const GET_POSTS_URL = 'controllers/post'
const SEND_FRIEND_REQUEST = 'controllers/user/addFriend'

function ProfileView(){
    const { auth } = useContext(AuthContext)
    const token = localStorage.getItem('token')

    const [posts, setPosts] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [friendList, setFriendList] = useState([])
    const [userAddable, setUserAddable] = useState(false)

    const urlParams = useParams()

    const fetchUserInfo = async () => {
        await axios.get(
            `/controllers/user/${urlParams.userId}`,
            {headers: {"Authorization": token}}
        ).then((res) => {
            setUserInfo(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const fetchFriendList = async () => {
        await axios.get(
            `/controllers/user/${urlParams.userId}/friendList`,
            {headers: {"Authorization": token}}
        ).then((res) => {
            setFriendList(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const fetchPosts = async () => {
        await axios.get(
            `/controllers/post/${urlParams.userId}`, 
            {headers: {"Authorization": token}}
        ).then((res) => {
            setPosts(_.sortBy(res.data, 'id').reverse())
        }).catch((err) => {
            console.log(err)
        })
    }

    const isUserAddable = async () => {
        if(urlParams.userId == auth.id) {
            setUserAddable(false)
            return
        }

        if(_.contains(_.pluck(friendList, 'friendId'), auth.id)) {
            setUserAddable(false)
            return
        }

        await axios.get(
            `/controllers/user/${urlParams.userId}/hasFriendRequest/${auth.id}`, 
            {headers: {"Authorization": token}}
        ).then((res) => {
            setUserAddable(!res.data)
        }).catch(console.log)
    }

    const handleAddFriend = () => {
        console.log('add: ', {
            toUserId: parseInt(urlParams.userId),
            fromUserId: auth.id
        })
        axios.post(
            SEND_FRIEND_REQUEST,
            {
                toUserId: parseInt(urlParams.userId),
                fromUserId: auth.id
            },
            {headers: {"Authorization": token}}
        ).then(() => {
            setUserAddable(false)
        }).catch(console.log)
    }

    useEffect(() => {
        fetchUserInfo()
        fetchPosts()
        fetchFriendList()
    }, [urlParams])

    useEffect(() => {
        isUserAddable()
    }, [friendList])

    async function handlePostDelete (id) {
        await axios.delete(GET_POSTS_URL, {
                headers: {
                    "Authorization": token
                },
                params: {
                    id: id
                }
            }).then(() => {
                setPosts(_.filter(posts, (post) => {
                    if(post.id !== id){
                        return post
                    }
                }))
            }).catch(err => console.log(err))
    }

    const ProfileItem = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 250
      }))
    const FriendListItem = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 'auto'
      }))
    const PostsItem = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        minHeight: 250
      }))
    

    return(
        <>
            <Container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
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
                <Grid container spacing={2} columns={12}>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <ProfileItem>
                            <Box
                                spacing={0}
                                display='flex'
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Avatar sx={{ bgcolor: deepOrange[500], height: 150, width: 150}} variant="circle"/>
                            </Box>
                            <Box
                                spacing={0}
                                display='flex'
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{marginTop: 2}}
                            >
                                <Typography sx={{color: 'black'}}>{`${userInfo.name} ${userInfo.surname}`}</Typography>
                            </Box>
                            <Box
                                spacing={0}
                                display='flex'
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{marginTop: -1}}
                            >
                                <Typography>{userInfo.userName}</Typography>
                            </Box>
                            {
                                userAddable
                                    &&
                                <Box
                                    spacing={0}
                                    display='flex'
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <IconButton onClick={handleAddFriend}>
                                        <PersonAddIcon/>
                                    </IconButton>
                                </Box>
                            }
                        </ProfileItem>
                        <FriendListItem>
                            <FriendListPreview
                                friendList={friendList}
                            />
                        </FriendListItem>
                    </Grid> 
                    <Grid item xs={12} sm={12} md={9} lg={9}>
                        <PostsItem>
                            {posts.length > 0?
                                posts.map((post) => {
                                    return(
                                        <PostView
                                            post={post}
                                            enableDeletion={auth.id === post.user.id}
                                            onDeleteCallback={handlePostDelete}
                                        />
                                    )
                                })
                            : <></>}
                        </PostsItem>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ProfileView