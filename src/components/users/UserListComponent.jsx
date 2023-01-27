import { Link } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

/**
 * 
 * @param {Array} items Items that will be used to display the User List
 * @param {Function} callback Callback for when some item is clicked
 * @returns callback
 */
const Post = (props) => {

    const handleCallback = () => {
        props.callback()
    }
    const users = props.items
    
    return(
        <>
            {users && 
            <List dense sx={{ width: '100%', minWidth: 300, minHeight: 60, maxHeight: 400, bgcolor: 'background.paper' }}>
                    {users.map((user) => {
                        return (
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleCallback} component={Link} to={`/profile/${user.id}`}>
                                    <ListItemAvatar>
                                        <Avatar/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.username}
                                        secondary={user.email}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )   
                })}
            </List>}
        </>
    )
}

export default Post