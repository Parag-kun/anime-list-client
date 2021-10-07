import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'


import Layout from '../components/Layout'
import { useSearchStyles } from '../utils/styles'
import SearchUsers from '../components/SearchUsers'
import SearchAnimes from '../components/SearchAnimes'

function Search() {
    const classes = useSearchStyles()
    const [searchString, setSearchString] = useState('')
    const [choice, setChoice] = useState('user')

    return (
        <Layout>
            <Grid container className={classes.container}>
                <Grid item container xs={12} className={classes.tab}>
                    <div className={classes.option}>
                        <Typography style={{ transition: 'all 0.2s'}} name="user" onClick={e => setChoice(e.target.getAttribute('name'))} className={choice === 'user' ? 'blue' : ''} variant={choice === 'user' ? 'subtitle1' : 'subtitle2'}>Users</Typography>
                        <Typography style={{ transition: 'all 0.2s'}} name="anime" onClick={e => setChoice(e.target.getAttribute('name'))} className={choice === 'anime' ? 'blue' : ''} variant={choice === 'anime' ? 'subtitle1' : 'subtitle2'}>Animes</Typography>
                    </div>
                    <div className={classes.search}>
                        <input type="text" className={classes.searchInput} onChange={e => setSearchString(e.target.value)} value={searchString} />
                        <SearchRoundedIcon />
                    </div>
                </Grid>
                <Grid container item xs={12} spacing={1}>
                {choice === 'user' && <SearchUsers searchString={searchString}/>}
                {choice === 'anime' && <SearchAnimes searchString={searchString}/>}
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Search
