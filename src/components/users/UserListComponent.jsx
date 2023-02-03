import { Link } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * 
 * @param {Array} items Items that will be used to display the User List
 * @param {Function} callback Callback for when some item is clicked
 * @returns callback
 */
const UserListComponent = (props) => {

    const handleCallback = () => {
        props.callback()
    }
    const users = props.items
    
    return(
        <>
            {users.length > 0 ? 
                <List dense sx={{ width: '100%', minWidth: 300, minHeight: 60, maxHeight: 400, bgcolor: 'background.paper' }}>
                        {users.map((user) => {
                            return (
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleCallback} component={Link} to={`/profile/${user.id}`}>
                                        <ListItemAvatar>
                                            <Avatar/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${user.name} ${user.surname}`}
                                            secondary={user.userName}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )   
                    })}
                </List>
            :
                <Box
                    display='flex'
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{width: 300, marginTop: 2, marginBottom: 2}}
                >
                    <Typography>Nenhum registro encontrado!</Typography>
                </Box>}
        </>
    )
}

export default UserListComponent