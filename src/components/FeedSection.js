import React, { useEffect, useContext } from 'react'
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'

import _ from 'underscore'

const GET_POSTS_URL = 'controllers/post'

const Feed = ({posts, changePosts}) => {

    const { auth } = useContext(AuthContext)
    const token = localStorage.getItem('token') 

    useEffect(() => {
        if(_.isEmpty(posts)){
            axios.get(GET_POSTS_URL, {headers: {"Authorization": token}})
                .then((res) => {
                    changePosts(_.sortBy(res.data, 'id').reverse())
                }).catch((err) => {
                    console.log(err)
                })
        }
    }, [posts])

    return(
        <>
           {posts.map((post, index) => {
                return (
                        <div class="bg-white border mt-2" key={post.id}>
                            <div>
                                <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                                    <div class="d-flex flex-row align-items-center feed-text px-2">
                                        <img class="rounded-circle m-2" src="https://assets5.lottiefiles.com/avatars/default_user.jpg" width="45"/>
                                        <div class="d-flex flex-column flex-wrap ml-2"><span class="font-weight-bold">{post.user.username}</span></div>
                                        {(post.user.id === auth.id)? <button type="button" class="btn btn-outline-danger m-2">Apagar</button>: ""}
                                    </div>
                                    <div class="feed-icon px-2"><i class="fa fa-ellipsis-v text-black-50"></i></div>
                                </div>
                            </div>
                            <div class="p-2 px-3"><span style={{whiteSpace: 'pre-line'}}>{post.description}</span></div>
                            <div class="d-flex justify-content-end socials p-2 py-3"><i class="fa fa-thumbs-up"></i><i class="fa fa-comments-o"></i><i class="fa fa-share"></i></div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Feed