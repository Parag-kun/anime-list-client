import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'

import useForm from '../utils/useForm'
import { Button, TextField, Grid, Typography } from '@material-ui/core'
import { AuthContext } from '../context/Auth'
import { REGISTER } from '../utils/queries'

function Register(props) {
    const { onChange, onSubmit, values: user } = useForm(registerUserCallback, {
        username: '', password: '', confirmPassword: ''
    })
    const [errors, setErrors] = useState({})

    const { login } = useContext(AuthContext)

    const [registerUser] = useMutation(REGISTER, {
        update(_, { data: { register: userData } }) {
            login(userData)
            props.history.push('/')            
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: user
    })

    function registerUserCallback() {
        registerUser()
    }

    return (
        <Grid container direction="column" justifyContent="center" alignItems="stretch" className="form-container">
            <Grid item className="register-text">
                <Typography variant="h4" align="center" color="primary">
                    Register
                </Typography>
            </Grid>
            <Grid item container justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-element">
                        <TextField fullWidth name="username" label="Username" value={user.username} onChange={onChange} error={errors.username} helperText={errors.username}/>
                        </div>
                        <div className="form-element">
                        <TextField fullWidth type="password" name="password" label="Password" value={user.password} onChange={onChange} error={errors.password} helperText={errors.password}/>
                        </div>
                        <div className="form-element">
                        <TextField fullWidth type="password" name="confirmPassword" label="Confirm Password" value={user.confirmPassword} onChange={onChange} error={errors.confirmPassword} helperText={errors.confirmPassword}/>
                        </div>
                        <div className="form-element">
                        <Button type="submit" color="primary" variant="contained">REGISTER</Button>
                        </div>                   
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Register
