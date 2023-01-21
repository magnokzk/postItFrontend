import React from 'react'


import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import PostView from '../../components/posts/PostViewComponent'
import _ from 'underscore'
import axios from '../../api/axios'

import { styled } from '@mui/material/styles'
import { deepOrange } from '@mui/material/colors'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const GET_POSTS_URL = 'controllers/post'

function ProfileView(){
    const { auth } = useContext(AuthContext)
    const token = localStorage.getItem('token')

    const [posts, setPosts] = useState([])
    const [userInfo, setUserInfo] = useState({})

    const urlParams = useParams()

    useEffect(() => {
        axios.get(
            `/controllers/post/${urlParams.userId}`, 
            {headers: {"Authorization": token}}
        ).then((res) => {
            setPosts(_.sortBy(res.data, 'id').reverse())
        }).catch((err) => {
            console.log(err)
        })

        axios.get(
            `/controllers/user/${urlParams.userId}`,
            {headers: {"Authorization": token}}
        ).then((res) => {
            setUserInfo(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

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
                                sx={{marginTop: 4.5}}
                            >
                                <Typography>{userInfo.username}</Typography>
                            </Box>
                        </ProfileItem>
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