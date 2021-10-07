import React, { useContext } from 'react'
import { Grid, Avatar, Typography } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'

import { useUserCardStyles } from '../utils/styles'
import { ADD_FRIENDS, REMOVE_FRIENDS, GET_USERS, GET_FRIENDS } from '../utils/queries'
import { AuthContext } from '../context/Auth'

function UserCard({ friend: { name, text }, searchString, relation }) {
    const classes = useUserCardStyles()
    const { user } = useContext(AuthContext)

    const [addFriend] = useMutation(ADD_FRIENDS, {
        variables: { clickerName: user.username, receiverName: name },
        update(proxy, result) {
            if (searchString) {
                let data = proxy.readQuery({ query: GET_USERS, variables: { searchString } })
                proxy.writeQuery({ query: GET_USERS, variables: { searchString }, data: { getUsers: data.getUsers.filter(friend => friend.name !== name) } })

                data = proxy.readQuery({ query: GET_USERS, variables: { searchString } })
                proxy.writeQuery({ query: GET_USERS, variables: { searchString }, data: { getUsers: [result.data.addFriend, ...data.getUsers] } })
            } else if (relation) {
                let data = proxy.readQuery({ query: GET_FRIENDS, variables: { relation } })
                proxy.writeQuery({ query: GET_FRIENDS, variables: { relation }, data: { getSpecificUsers: data.getSpecificUsers.filter(friend => friend.name !== name) } })

                if (relation === 'requests') {
                    data = proxy.readQuery({ query: GET_FRIENDS, variables: { relation: 'friends' } })
                    proxy.writeQuery({ query: GET_FRIENDS, variables: { relation: 'friends' }, data: { getSpecificUsers: [result.data.addFriend, ...data.getSpecificUsers] } })
                }
            }
        }
    })

    const [removeFriend] = useMutation(REMOVE_FRIENDS, {
        variables: { clickerName: user.username, receiverName: name },
        update(proxy, result) {
            if (searchString) {
                let data = proxy.readQuery({ query: GET_USERS, variables: { searchString } })
                proxy.writeQuery({ query: GET_USERS, variables: { searchString }, data: { getUsers: data.getUsers.filter(friend => friend.name !== name) } })

                data = proxy.readQuery({ query: GET_USERS, variables: { searchString } })
                proxy.writeQuery({ query: GET_USERS, variables: { searchString }, data: { getUsers: [result.data.removeFriend, ...data.getUsers] } })
            } else if (relation) {
                let data = proxy.readQuery({ query: GET_FRIENDS, variables: { relation } })
                proxy.writeQuery({ query: GET_FRIENDS, variables: { relation }, data: { getSpecificUsers: data.getSpecificUsers.filter(friend => friend.name !== name) } })                
            }
        }
    })

    const stylesDelete = ((obj, value) => obj[value])({ 'Sent': { border: '1px solid rgba(0, 3, 201, 0.774)', color: 'rgba(0, 3, 201, 0.774)' }, 'Denied': { border: '1px solid orange', color: 'orange' }, 'Refriend': { display: 'none' }, 'Send': { display: 'none' }, 'Requested': { display: 'none' }, 'Accept': { border: '1px solid gray', color: 'gray' }, 'Remove': { border: '1px solid rgba(204, 0, 0, 0.836)', color: 'rgba(204, 0, 0, 0.836)' }, 'Unfriend': { backgroundColor: 'rgba(204, 0, 0, 0.836)', color: 'white' } }, text)

    const stylesAdd = ((obj, value) => obj[value])({ 'Sent': { display: 'none' }, 'Denied': { display: 'none' }, 'Refriend': { backgroundColor: 'green', color: 'white' }, 'Send': { backgroundColor: 'rgba(0, 3, 201, 0.774)', color: 'white' }, 'Requested': { border: '1px solid green', color: 'green' }, 'Accept': { backgroundColor: 'orange', color: 'white' }, 'Remove': { display: 'none' }, 'Unfriend': { boxShadow: '0px 0px 2px gray, inset 0px 0px 1px gray' } }, text)

    console.log(text)

    return (
        <Grid item xs={12} className={classes.container}>
            <div className={classes.avatar}>
                <Avatar src="https://www.ssrl-uark.com/wp-content/uploads/2014/06/no-profile-image.png"></Avatar>
                <Typography variant="h6">{name}</Typography>
            </div>
            <div className={classes.button}>
                {
                    text === 'Unfriend' ? (
                        <Link to={`/users/${name}`}className={classes.button} ><button style={stylesAdd}><Typography variant="caption">View</Typography></button></Link>
                    ) : (
                        <button style={stylesAdd} onClick={addFriend}><Typography variant="caption">{text}</Typography></button>
                    )
                }
                <button style={stylesDelete} onClick={removeFriend}><Typography variant="caption">{text === 'Accept' ? 'Deny' : text}</Typography></button>
            </div>
        </Grid>
    )
}

export default UserCard
