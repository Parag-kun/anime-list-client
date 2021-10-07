import React, { useState, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, CssBaseline, FormControl, InputLabel, Select, Input, MenuItem } from '@material-ui/core'

import AnimeCard from '../components/AnimeCard'
import Layout from '../components/Layout'
import { GET_ANIMES, GET_USER_ANIMES } from '../utils/queries'
import { useAnimeListStyles } from '../utils/styles'
import { AuthContext } from '../context/Auth'

function AnimeList() {
    const classes = useAnimeListStyles()
    const { user: { username } } = useContext(AuthContext)
    const [sortBy, setSortBy] = useState('rating')

    const { loading, data: { getAnimes: animes } = {} } = useQuery(GET_ANIMES, {
        variables: { sortBy }
    })

    const { data: { getUserAnimes: userAnimes = [] } = {} } = useQuery(GET_USER_ANIMES, {
        variables: { username, sortBy }
    })

    return (
        <Layout>
            <CssBaseline />
            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.menu}>
                    <FormControl>
                        <InputLabel>Sort by</InputLabel>
                        <Select                            
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            input={<Input />}
                        >
                            <MenuItem value='rating'>Rating</MenuItem>
                            <MenuItem value='popularity'>Popularity</MenuItem>                            
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item container xs={12} spacing={1}>
                {
                    loading ? (
                        <h4>Loading....</h4>
                    ) : (
                        animes?.map(({ id, name, rating, members, imageURL, ratedBy }, index) => (
                            <AnimeCard key={id} name={name} rating={rating} members={members} imageURL={imageURL} status={userAnimes.find(({ animeName }) => animeName === name)?.status} renderMembers={true} ratedBy={ratedBy} index={index} />
                        )) ?? (
                            <h2>No Anime In The List</h2>
                        )
                    )
                }
                </Grid>
            </Grid>
        </Layout>
    )
}

export default AnimeList
