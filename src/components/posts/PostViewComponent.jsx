import { Link } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'

/**
 * Mounts a component react for the given post information
 * @param {object} post Object that contains post information
 * @param {boolean} enableDeletion Boolean that defines if the object can be deleted or not
 * @param {callback} onDeleteCallback Callback of the post id for deletion
 * @returns Mounted react component
 */
const Post = (props) => {

    const handleDeleteClick = (postId) => {
        props.onDeleteCallback(postId)
    }

    return(
        <>
            <div class="bg-white border mt-2" key={props.post.id}>
                <div>
                    <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                        <div class="d-flex flex-row align-items-center feed-text px-2" style={{width: "100%"}}>
                            <Avatar sx={{ bgcolor: deepOrange[500]}} component={Link} to={`/profile/${props.post.user.id}`} variant="circle"/>
                            <div class="d-flex flex-column flex-wrap ml-2" style={{marginLeft: 5}}><Typography style={{ textDecoration: 'none', color: "black" }} component={Link} to={`/profile/${props.post.user.id}`}>{props.post.user.username}</Typography></div>
                            {props.enableDeletion? <IconButton type="button" style={{marginLeft: "auto"}} onClick={() => handleDeleteClick(props.post.id)}><DeleteIcon/></IconButton>: ""}
                        </div>
                        <div class="feed-icon px-2"><i class="fa fa-ellipsis-v text-black-50"></i></div>
                    </div>
                </div>
                <div class="p-2 px-3"><span style={{whiteSpace: 'pre-line'}}>{props.post.description}</span></div>
                <div class="d-flex justify-content-end socials p-2 py-3"><i class="fa fa-thumbs-up"></i><i class="fa fa-comments-o"></i><i class="fa fa-share"></i></div>
            </div>
        </>
    )
}

export default Post