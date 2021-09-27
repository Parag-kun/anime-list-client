import React, { useContext, useState } from 'react'
import { Grid, Typography, Card, CardMedia, CardContent, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button, IconButton, FormControl, MenuItem, Select, Input, useMediaQuery, Tooltip } from '@material-ui/core'
import StarRateOutlinedIcon from '@material-ui/icons/StarRateOutlined';
import PeopleIcon from '@material-ui/icons/People'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/Auth';
import useMediaQueryUtils from '../utils/useMediaQueryUtils';
import useForm from '../utils/useForm';
import { EDIT_ANIME, GET_USER_ANIMES, DELETE_AMIME, ADD_ANIME, GET_ANIMES } from '../utils/queries'
import { useAnimeCardStyles } from '../utils/styles'

function AnimeCard({ name, score, rating, members, imageURL, renderMembers, status, index, filter, ratedBy }) {
    const classes = useAnimeCardStyles()
    const obj = { xs: 6, sm: 6, md: 4, lg: 6, xl: 4 }

    const { user } = useContext(AuthContext)
    const [dialog, setDialog] = useState(false)

    const { onChange, onSubmit, values } = useForm(updateAnimeCallback, {
        name, score, status, imageURL
    })

    const [updateAnime] = useMutation(EDIT_ANIME, {
        variables: values,
        update(proxy, { data: { updateAnime }}) {
            let data = proxy.readQuery({ query: GET_USER_ANIMES, variables: { username: user.username } })
            proxy.writeQuery({ query: GET_USER_ANIMES, variables: { username: user.username }, data: { getUserAnimes: data.getUserAnimes.filter(({ animeName }) => animeName !== updateAnime.animeName) }})
            data = proxy.readQuery({ query: GET_USER_ANIMES, variables: { username: user.username } })
            proxy.writeQuery({ query: GET_USER_ANIMES, variables: { username: user.username }, data: { getUserAnimes: [updateAnime, ...data.getUserAnimes] }})
        }
    })

    function updateAnimeCallback() {
        fetch(values.imageURL)
            .then(() => {
                setDialog(false)
                updateAnime()
            })
            .catch(err => console.log(err))
    }

    const [deleteAnime] = useMutation(DELETE_AMIME, {
        variables: { name },
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_USER_ANIMES, variables: { username: user.username }
            })

            proxy.writeQuery({
                query: GET_USER_ANIMES, variables: { username: user.username }, data: { getUserAnimes: data.getUserAnimes.filter(({ animeName }) => animeName !== result.data.deleteAnime.name) }
            })
        }
    })

    const [addAnime] = useMutation(ADD_ANIME, {
        variables: { name, score: 0, status: 'plan' },
        refetchQueries: [{ query: GET_ANIMES }],
        update(proxy, result) {
            const { getUserAnimes } = proxy.readQuery({ query: GET_USER_ANIMES, variables: { username: user.username }})
            proxy.writeQuery({ query: GET_USER_ANIMES, variables: { username: user.username }, data: { getUserAnimes: [result.data.addAnime, ...getUserAnimes] }})
        }
    })

    const color = renderMembers && ((obj, value) => obj[value])({ plan: 'rgb(243 136 4)', watching: 'green', completed: 'rgb(21 19 156)' }, status)

    const isLG = useMediaQuery('(min-width:1280px)')

    return (
        <Grid item {...obj} >
            {
                user.author && (
                    <Dialog open={dialog} onClose={() => setDialog(false)}>
                        <DialogTitle>Add Image URL</DialogTitle>
                        <DialogContent>
                            <TextField name="imageURL" label="ImageURL" value={values.imageURL} onChange={onChange} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onSubmit}>Set</Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            <Card className={classes.root} style={{ boxShadow: `0px 0px 5px ${color}, inset 0px 0px 2px ${color}` }}>
                <CardMedia className={classes.media} image={imageURL || "https://i.stack.imgur.com/y9DpT.jpg"} onClick={() => setDialog(true)} />
                <CardContent className={classes.content}>
                    <Grid container direction="column" >
                        <Grid item className={classes.title} zeroMinWidth>
                            <Typography variant={useMediaQueryUtils(['subtitle1', 'h6', 'h5', 'h5', 'h5'])} noWrap style={{ color: `${color}` }}>
                                {(index + 1) || ''} {name}
                            </Typography>
                        </Grid>
                        <Grid item container style={{ fontSize: 10 }}>
                            <Grid item xs={6} className={classes.rating}>
                                {
                                    renderMembers ? (
                                        <React.Fragment>
                                            <StarRateOutlinedIcon className={classes.icon} style={{ color: `${color}` }} />
                                            <Typography variant="subtitle1" className={classes.select} style={{ color: `${color}` }}>
                                                {renderMembers ? rating.toFixed(2) : rating}
                                            </Typography>
                                        </React.Fragment>
                                    ) : (
                                        <FormControl className={values.status === 'plan' ? classes.disable : ''} style={{ color: `${color}` }}>
                                            <Select
                                                name="score"
                                                value={values.status === 'plan' ? 0 : values.score}
                                                onChange={onChange}
                                                input={<Input type="number" />}
                                                IconComponent={StarRateOutlinedIcon}
                                                className={classes.select}
                                                variant="filled"
                                                style={{ color: `${color}` }}
                                            >
                                                <MenuItem value={0} onClick={onSubmit}>--</MenuItem>
                                                {
                                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => <MenuItem key={value} value={value} onClick={onSubmit}>{value}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    )
                                }

                            </Grid>
                            {
                                renderMembers ? (
                                    <Grid item xs={6} className={classes.rating}>
                                        <PeopleIcon className={classes.icon} style={{ color: `${color}`, marginRight: 3 }} />
                                        <Typography variant="subtitle1" className={classes.select} style={{ color: `${color}`, paddingTop: 3 }}>
                                            {members.watching + members.completed + members.plan}
                                        </Typography>
                                    </Grid>
                                ) : (
                                    <Grid item xs={6} className={classes.rating}>
                                        {
                                            filter === 'all' && (
                                                <FormControl className={classes.formControl}>
                                                    <Select
                                                        name="status"
                                                        value={values.status}
                                                        onChange={e => onChange(e, false)}
                                                        input={<Input />}
                                                    >
                                                        {
                                                            ['plan', 'watching', 'completed'].map(value => <MenuItem key={value} value={value} onClick={onSubmit}>{(status => status.charAt(0).toUpperCase() + status.slice(1))(value)}</MenuItem>)
                                                        }
                                                    </Select>
                                                </FormControl>
                                            )
                                        }
                                    </Grid>
                                )
                            }
                        </Grid>
                        {
                            renderMembers && isLG && (
                                <Grid style={{ paddingLeft: 6, paddingTop: 5 }}>
                                    <Typography style={{ color: `${color}`, marginBottom: 15 }}>
                                        <em>Scored by {ratedBy}</em>
                                    </Typography>
                                    <Grid container >
                                        <Grid item xs={10} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '0px 10px' }}>
                                            <Typography variant="subtitle2" style={{ color: `blue`, border: '1px solid blue', padding: '1px 5px', margin: 2, borderRadius: 5 }}>
                                                Completed
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ color: `green`, border: '1px solid green', padding: '1px 5px', margin: 2, borderRadius: 5 }}>
                                                Watching
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ color: `orange`, border: '1px solid orange', padding: '1px 5px', margin: 2, borderRadius: 5 }}>
                                                Planning to watch
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography style={{ color: `blue`, margin: 5 }}>
                                                {members.completed}
                                            </Typography>
                                            <Typography style={{ color: `green`, margin: 5 }}>
                                                {members.watching}
                                            </Typography>
                                            <Typography style={{ color: `orange`, margin: 5 }}>
                                                {members.plan}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Grid>
                </CardContent>
                {
                    renderMembers ? (
                        !status && (
                            <Tooltip title='Add to list'>
                                <IconButton className={classes.action} color="primary" onClick={addAnime}>
                                    <AddCircleRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        )
                    ) : (
                        <Tooltip title='Delete from list'>
                            <IconButton className={classes.action} color="secondary" onClick={deleteAnime}>
                                <DeleteTwoToneIcon />
                            </IconButton>
                        </Tooltip>
                    )
                }
            </Card>
        </Grid>
    )
}

export default AnimeCard
