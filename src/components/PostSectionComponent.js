import React, { useContext, useState } from 'react'
import axios from '../api/axios'
import _ from 'underscore'
import AuthContext from '../context/AuthProvider'

const POST_URL = 'controllers/post'

function PostSection({posts, changePosts}){

    const { auth } = useContext(AuthContext)

    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        
        e.preventDefault()

        try{
            const response = await axios.post(POST_URL,
                JSON.stringify({user_id: auth.id, description: description}),
                {
                    headers: {'Content-Type': 'application/json'}
                })
            const tempPosts = [...posts]
            tempPosts.push(response?.data)
            changePosts(_.sortBy(tempPosts, 'id').reverse())
            setDescription('')
        } catch(err) {
            console.log(err.response?.status)
        }
    }

    return(
        <>
            <div class="justify-content-between d-flex align-items-center p-2 bg-white border">
                <div class="feed-text px-2 flex-grow-1 ">
                    <form name="postForm" onSubmit={handleSubmit}>
                        <div class="form-group">
                            <div class="input-group">
                                <textarea class="form-control custom-control" value={description} onChange={(e) => {setDescription(e.target.value)}} rows="3" style={{resize: 'none'}} placeholder="O que você está pensando?"></textarea>     
                                <button type='submit' class="btn btn-primary">
                                    <span class="
                                            input-group-addon
                                            align-middle 
                                            d-flex 
                                            justify-content-center 
                                            align-items-center"
                                        >
                                        Post
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PostSection
