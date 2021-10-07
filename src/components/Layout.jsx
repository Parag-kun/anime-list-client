import React, { useContext, useState } from 'react'
import { Grid, Typography, Dialog, DialogContent, DialogTitle, FormControl, TextField, InputLabel, Select, DialogActions, Button, MenuItem, Input } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone'
import { NavLink } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { useLayoutStyles } from '../utils/styles'
import { ADD_ANIME, GET_USER_ANIMES } from '../utils/queries'
import useForm from '../utils/useForm'
import { AuthContext } from '../context/Auth'

function Layout({ children }) {
    const classes = useLayoutStyles()
    const { user } = useContext(AuthContext)
    const [showForm, setShowForm] = useState(false)    
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(addAnimeCallback, {
        name: '', score: 0, status: 'plan'
    })

    const [addAnime] = useMutation(ADD_ANIME, {
        variables: values,
        onError(err) {
            setErrors(err.graphQLErrors[0]?.extensions?.errors ?? {})
        },
        update(proxy, result) {
            setShowForm(false)
            const data = proxy.readQuery({ query: GET_USER_ANIMES, variables: { username: user.username } })
            proxy.writeQuery({ query: GET_USER_ANIMES, variables: { username: user.username }, data: { getUserAnimes: [result.data.addAnime, ...data.getUserAnimes] } })
        }
    })

    function addAnimeCallback() {
        addAnime()
    }

    return (
        <Grid container>
            <Grid item xs={12} md={10} xl={8}>
                {children}
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
            <Grid container item xs={12} md={1} xl={2} className={classes.tab}>
                <Grid item xs={2}><NavLink exact to="/" activeClassName="blue"><HomeIcon /><Typography variant="caption">Home</Typography></NavLink></Grid>
                <Grid item xs={3}><NavLink to="/users" activeClassName="blue"><PersonOutlineIcon /><Typography variant="caption">User</Typography></NavLink></Grid>
                <Grid item xs={2}><div className={classes.icon} onClick={() => setShowForm(showForm => !showForm)}><AddCircleOutlineTwoToneIcon fontSize="large" /></div></Grid>
                <Grid item xs={3}><NavLink to="/animelist" activeClassName="blue"><FormatListNumberedIcon /><Typography variant="caption">Ranking</Typography></NavLink></Grid>
                <Grid item xs={2}><NavLink to="/search" activeClassName="blue"><SearchIcon /><Typography variant="caption">Search</Typography></NavLink></Grid>
            </Grid>
        </Grid>
    )
}

export default Layout
