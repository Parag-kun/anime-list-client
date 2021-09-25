import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, CssBaseline, FormControl, InputLabel, Select, Input, MenuItem } from '@material-ui/core'

import AnimeCard from '../components/AnimeCard'
import useMediaQueryUtils from '../utils/useMediaQueryUtils'
import { GET_ANIMES, GET_USER_ANIMES_FOR_RANKING } from '../utils/queries'
import { useAnimeListStyles } from '../utils/styles'
import { AuthContext } from '../context/Auth'

function AnimeList() {
    const classes = useAnimeListStyles()
    const { user: { username } } = useContext(AuthContext)
    const [sortBy, setSortBy] = useState('rating')

    const { loading, data: { getAnimes: animes } = {} } = useQuery(GET_ANIMES, {
        variables: { sortBy }
    })

    const { data: { getUserAnimes: userAnimes = [] } = {} } = useQuery(GET_USER_ANIMES_FOR_RANKING, {
        variables: { username, sortBy }
    })

    useEffect(() => {}, [sortBy])

    const padding = useMediaQueryUtils([10, 40, 80, 150, 250])

    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container spacing={1} className={classes.container} style={{ padding: `0px ${padding}px` }}>
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
        </React.Fragment>
    )
}

export default AnimeList
