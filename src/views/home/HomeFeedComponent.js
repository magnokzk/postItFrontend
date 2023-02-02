import React from 'react'

import PostSection from './PostSection'
import FeedSection from './FeedSection'

function HomeFeed(){
    const [updatePosts, setUpdatePosts] = React.useState(true)

    return(
        <>
            <div class="container mt-4 mb-5">
                <div class="d-flex justify-content-center row">
                    <div class="col-md-8">
                        <div class="feed p-2">
                            <PostSection updatePosts={updatePosts} setUpdatePosts={setUpdatePosts}/>
                            <FeedSection updatePosts={updatePosts} setUpdatePosts={setUpdatePosts}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeFeed