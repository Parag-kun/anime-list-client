import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, Input, MenuItem, Typography, Tooltip } from '@material-ui/core'

import { AuthContext } from '../context/Auth'
import AnimeCard from '../components/AnimeCard'
import useForm from '../utils/useForm'
import useMediaQueryUtils from '../utils/useMediaQueryUtils'
import { GET_USER_ANIMES, ADD_ANIME } from '../utils/queries'
import { useHomeStyles } from '../utils/styles'

function Home() {
    const { user, logout } = useContext(AuthContext)

    const [showForm, setShowForm] = useState(false)
    const classes = useHomeStyles()
    const { onChange, onSubmit, values } = useForm(addAnimeCallback, {
        name: '', score: 0, status: 'plan'
    })

    const [filter, setFilter] = useState('all')
    const [errors, setErrors] = useState({})

    const { loading, data: { getUserAnimes: animes } = {} } = useQuery(GET_USER_ANIMES, {
        variables: { username: user?.username }
    })

    const [addAnime] = useMutation(ADD_ANIME, {
        variables: values,
        refetchQueries: [{ query: GET_USER_ANIMES, variables: { username: user?.username } }],
        onError(err) {
            setErrors(err.graphQLErrors[0]?.extensions?.errors ?? {})
        },
        update() {
            setShowForm(false)
        }
    })

    function addAnimeCallback() {
        addAnime()
    }

    const isEmpty = arr => arr?.length ? arr : null

    const padding = useMediaQueryUtils([10, 40, 80, 150, 250])

    const homePage = user ? (
        <Grid container className={classes.container} style={{ padding: `0px ${padding}px` }}>
            <Grid item container xs={12} className={classes.menu} alignItems="center">
                <Grid item xs={6} md={3}>
                    <FormControl variant="filled" className={classes.filter}>
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
                <Grid item xs={6} md={3}>
                    <Tooltip title="Add new anime">
                        <Button onClick={() => setShowForm(showForm => !showForm)} color="primary">
                            ADD
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Button color="primary">
                        <Link to="/animelist" style={{ textDecoration: 'none' }}>Ranking</Link>
                    </Button>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Button onClick={logout}>
                        LOG OUT
                    </Button>
                </Grid>
                <Dialog open={showForm} onClose={() => setShowForm(false)}>
                    <DialogTitle>Add Anime</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <FormControl>
                            <TextField name="name" label="Name" value={values.name} onChange={onChange} error={errors.name ? true : false} helperText={errors.name} />
                        </FormControl>
                        <FormControl className={values.status === 'plan' ? classes.disable : ''}>
                            <InputLabel>Score</InputLabel>
                            <Select
                                name="score"
                                value={values.status === 'plan' ? 0 : values.score}
                                onChange={onChange}
                                input={<Input type="number" />}
                            >
                                <MenuItem value={0}>--</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" className={classes.dialogFilter}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={values.status}
                                onChange={e => onChange(e, false)}
                            >
                                <MenuItem value="plan">Plan to watch</MenuItem>
                                <MenuItem value="watching">Watching</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowForm(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={onSubmit} color="primary">
                            ADD
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid container item xs={12} spacing={1}>
                {
                    loading ? (
                        <h1>Loading....</h1>
                    ) : isEmpty(animes?.filter(({ status }) => filter === status || filter === 'all'))?.map(({ id, animeName, score, status, imageURL, members }) => (
                        <AnimeCard key={id} imageURL={imageURL} score={score} name={animeName} status={status} filter={filter} members={members} />
                    )) ?? (
                        <Grid item xs={12} style={{ textAlign: 'center' }}><Typography color="textSecondary" variant="h4">No anime in the list</Typography></Grid>
                    )
                }
            </Grid>
        </Grid>
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
