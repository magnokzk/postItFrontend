import React from 'react'

import PostSection from './PostSectionComponent'
import FeedSection from './FeedSection'

function HomeFeed(){
    const [posts, setPosts] = React.useState([])

    const changePosts = (newPosts) => {
        setPosts(newPosts)
    }

    return(
        <>
            <div class="container mt-4 mb-5">
                <div class="d-flex justify-content-center row">
                    <div class="col-md-8">
                        <div class="feed p-2">
                            <PostSection posts={posts} changePosts={changePosts}/>
                            <FeedSection posts={posts} changePosts={changePosts}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeFeed