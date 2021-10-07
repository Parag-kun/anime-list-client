import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Dialog, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Typography, Avatar, IconButton } from '@material-ui/core'
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';

import { AuthContext } from '../context/Auth'
import AnimeCard from '../components/AnimeCard'
import Layout from '../components/Layout'
import { GET_USER_ANIMES } from '../utils/queries'
import { useHomeStyles } from '../utils/styles'

function Home({ friendName }) {
    const { user, logout } = useContext(AuthContext)
    
    const [logoutForm, setLogoutForm] = useState(false)

    const classes = useHomeStyles()

    const [filter, setFilter] = useState('all')

    const { loading, data: { getUserAnimes: animes } = {} } = useQuery(GET_USER_ANIMES, {
        variables: { username: user?.username }
    })

    const { data: { getUserAnimes: friendAnimes = [] } = {} } = useQuery(GET_USER_ANIMES, {
        variables: { username: friendName ?? '' }
    })

    const isEmpty = arr => arr?.length ? arr : null

    const homePage = user ? (
        <Layout>
            <Grid container className={classes.container}>
                <Grid item container xs={12} className={classes.menu} justifyContent="space-around" alignItems="center">
                    <Grid item xs={5}>
                        <FormControl variant="standard" className={classes.filter}>
                            <InputLabel id="filter">Filter</InputLabel>
                            <Select
                                labelId="filter"
                                value={filter}
                                onChange={e => setFilter(e.target.value)}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="plan">Plan to watch</MenuItem>
                                <MenuItem value="watching">Watching</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <div className={classes.avatar}>
                            <Avatar src="https://www.ssrl-uark.com/wp-content/uploads/2014/06/no-profile-image.png"></Avatar>
                            <Typography variant="h6">{friendName ?? user.username}</Typography>
                        </div>
                        <IconButton onClick={friendName ? (() => {}) : (() => setLogoutForm(true))} className={classes.button}>
                            {
                                friendName ? (
                                    <Link to="/users"><ExitToAppTwoToneIcon /></Link>
                                ) : (
                                    <Link><ExitToAppTwoToneIcon /></Link>
                                )
                            }
                        </IconButton>
                    </Grid>
                    <Dialog open={logoutForm} onClose={() => setLogoutForm(false)}>
                        <DialogContent>
                            <Typography variant="subtitle1">{user.username} you sure you want to leave?</Typography>
                        </DialogContent>
                        <DialogActions>'
                            <Button onClick={() => setLogoutForm(false)}>
                                Stay
                            </Button>
                            <Button onClick={logout}>
                                Leave
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Grid>
                <Grid container item xs={12} spacing={1}>
                    {
                        loading ? (
                            <h4 style={{ textAlign: 'center' }}>Loading...</h4>
                        ) : friendName ? isEmpty(friendAnimes?.filter(({ status }) => filter === status || filter === 'all'))?.map(({ id, animeName, score, status, imageURL, members }) => (
                            <AnimeCard key={id} imageURL={imageURL} score={score} name={animeName} friendStatus={status} filter={filter} members={members} friendName={friendName} status={animes.find(({ animeName: name }) => name === animeName)?.status} /> 
                        )) : (
                            isEmpty(animes?.filter(({ status }) => filter === status || filter === 'all'))?.map(({ id, animeName, score, status, imageURL, members }) => (
                                <AnimeCard key={id} imageURL={imageURL} score={score} name={animeName} status={status} filter={filter} members={members}/>
                            ))) ?? (
                                    <Grid item xs={12} style={{ textAlign: 'center' }}><Typography color="textSecondary" variant="h6">No anime in the list</Typography></Grid>
                                )
                    }
                </Grid>
            </Grid>
        </Layout>
    ) : (
        <Grid container style={{ height: '100vh' }} alignContent="center">
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button color="secondary">
                    <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                </Button>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button color="secondary">
                    <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link>
                </Button>
            </Grid>

        </Grid>
    )

    return homePage
}

export default Home
