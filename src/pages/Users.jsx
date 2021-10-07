import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'

import Layout from '../components/Layout'
import UserCard from '../components/UserCard.jsx'
import { useUserStyles } from '../utils/styles'
import { GET_FRIENDS } from '../utils/queries'

function Users() {
    const classes = useUserStyles()

    const [value, setValue] = useState('friends')

    const { loading, data: { getSpecificUsers: friends = [] } = {} } = useQuery(GET_FRIENDS, { variables: { relation: value }})
    
    const handleClick = e => setValue(e.target.getAttribute('name'))

    const isEmpty = arr => arr.length === 0 ? null : arr

    // console.log(friends)

    return (
        <Layout>
            <Grid container className={classes.container}>
                <Grid container item xs={12} md={1} xl={2} className={classes.tab}>
                    <Grid name="sents" onClick={handleClick} className={value === 'sents' ? 'bg-red br-left' : ''} item xs={3}><Typography variant="subtitle2">Sents</Typography></Grid>
                    <Grid name="friends" onClick={handleClick} className={value === 'friends' ? 'bg-red' : ''} item xs={3}><Typography variant="subtitle2">Friends</Typography></Grid>
                    <Grid name="requests" onClick={handleClick} className={value === 'requests' ? 'bg-red' : ''} item xs={3}><Typography variant="subtitle2">Requests</Typography></Grid>
                    <Grid name="unfriends" onClick={handleClick} className={value === 'unfriends' ? 'bg-red br-right' : ''} item xs={3}><Typography variant="subtitle2">Unfriends</Typography></Grid>
                </Grid>
                <Grid container item xs={12}>
                    {
                        loading ? (
                            <h4>Loading</h4>
                        ) : (
                            isEmpty(friends.map(friend => <UserCard key={friend.name} relation={value} friend={friend}/>)) ?? <h4>No {value} for now</h4>
                        )
                    }
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Users
