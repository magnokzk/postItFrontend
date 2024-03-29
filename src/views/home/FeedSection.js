import { useEffect, useContext, useState } from 'react'
import axios from '../../api/axios'
import AuthContext from '../../context/AuthProvider'

import PostView from '../../components/posts/PostViewComponent'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'
import ReplayIcon from '@mui/icons-material/Replay'
import GradeIcon from '@mui/icons-material/Grade';
import GroupsIcon from '@mui/icons-material/Groups'

import _ from 'underscore'

const GET_POSTS_URL = 'controllers/post'
const GET_FRIENDS_POSTS_URL = 'controllers/post/friendsPosts'

const Feed = ({updatePosts, setUpdatePosts}) => {

    const { auth } = useContext(AuthContext)
    const token = localStorage.getItem('token')

    const [loading, setLoading] =  useState(false)
    const [posts, setPosts] = useState([])
    const [friendsPosts, setFriendsPosts] = useState([])
    const [hasFailed, setHasFailed] = useState(false)
    const [value, setValue] = useState("1")

    useEffect(() => {
        if(updatePosts) {
            handleReloadPosts()
        }
    }, [updatePosts])

    const handleReloadPosts = async () => {
        try{
            setLoading(true)
            await axios.get(GET_POSTS_URL, {headers: {"Authorization": token}})
                .then((res) => {
                    setHasFailed(false)
                    setPosts(_.sortBy(res.data, 'id').reverse())
                })
                .catch(() => {
                    setHasFailed(true)
                })
            await axios.get(GET_FRIENDS_POSTS_URL, {headers: {"Authorization": token}})
                .then((res) => {
                    setHasFailed(false)
                    setFriendsPosts(_.sortBy(res.data, 'id').reverse())
                }).catch(() => {
                    setHasFailed(true)
                })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
            setUpdatePosts(false)
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
                handleReloadPosts()
            })
            .catch(err => console.log(err))
    }

    const handleValueChange = (event, newValue) => {
        setUpdatePosts(true)
        setValue(newValue)
    }

    return(
        <>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList centered={'true'} onChange={handleValueChange} aria-label="icon tabs example">
                    <Tab icon={<GradeIcon/>} label="For You" value="1"/>
                    <Tab icon={<GroupsIcon/>} label="Friends" value="2"/>
                </TabList>
                </Box>
                <TabPanel sx={{margin: 0, padding: 0}} value="1">
                    {
                        posts.length > 0?
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
                                            {
                                                hasFailed?
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
                                                :
                                                    <CircularProgress/>
                                            }
                                        </Box>
                                    </Container>
                    }
                </TabPanel>
                <TabPanel sx={{margin: 0, padding: 0}} value="2">
                {
                        friendsPosts.length > 0?
                                friendsPosts.map((post) => {
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
                                            {
                                                hasFailed?
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
                                                :
                                                    <CircularProgress/>
                                            }
                                        </Box>
                                    </Container>
                    }
                </TabPanel>
            </TabContext>
           
        </>
    )
}

export default Feed