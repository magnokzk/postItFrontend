import { useEffect, useContext, useState } from 'react'
import axios from '../../api/axios'
import AuthContext from '../../context/AuthProvider'

import PostView from '../../components/posts/PostViewComponent'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import ReplayIcon from '@mui/icons-material/Replay'

import _ from 'underscore'

const GET_POSTS_URL = 'controllers/post'

const Feed = ({posts, changePosts}) => {

    const { auth } = useContext(AuthContext)
    const token = localStorage.getItem('token') 

    const [loading, setLoading] =  useState(false)

    useEffect(() => {
        axios.get(GET_POSTS_URL, {headers: {"Authorization": token}})
            .then((res) => {
                changePosts(_.sortBy(res.data, 'id').reverse())
            })
    }, [])

    async function handleReloadPosts () {
        try{
            setLoading(true)
            await axios.get(GET_POSTS_URL, {headers: {"Authorization": token}})
                .then((res) => {
                    changePosts(_.sortBy(res.data, 'id').reverse())
                })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    async function handlePostDelete (id) {
        await axios.delete(GET_POSTS_URL, {
                headers: {
                    "Authorization": token
                },
                params: {
                    id: id
                }
            }).then(() => {
                changePosts(_.filter(posts, (post) => {
                    if(post.id !== id){
                        return post
                    }
                }))
            }).catch(err => console.log(err))
    }

    return(
        <>
           {posts.length > 0?
                posts.map((post) => {
                    return (
                            <PostView 
                                post={post}
                                onDeleteCallback={handlePostDelete}
                                enableDeletion={post.user.id === auth.id}
                            />
                        )
                    }):
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
                    <Box
                        spacing={0}
                        display='flex'
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                         <LoadingButton
                            color="primary"
                            onClick={handleReloadPosts}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<ReplayIcon />}
                            variant="filled"
                        >
                            Recarregar
                        </LoadingButton>
                    </Box>
                </Container>
            }
        </>
    )
}

export default Feed