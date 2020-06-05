import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router';
const userStyle = makeStyles(theme => ({
    formContainer: {
        marginTop: theme.spacing(24),
        marginLeft: theme.spacing(42),
        marginBottom: theme.spacing(20),
        textAlign: 'center',
        width: '50%',
        height: '24.75rem'
    },
    Forgetpassword: {
        width: '70%',
        borderRadius: '0.313rem',
        border: '1px solid green',
        height: '3.125rem',
        textDecoration: 'none',
        marginBottom: theme.spacing(2)
    },
    Forgetbuttonn: {
        width: '50%',
        textAlign: 'center',
        backgroundColor: 'green',
        color: '#eee',
        textDecoration: 'none',
        border: 'none',
        height: '3.125rem',
        borderRadius: '0.313rem',
        marginLeft: theme.spacing(4)
    },

}))
const ForgetPass = (props) => {
    const classes = userStyle();
    const submithandler = (event) => {
        event.preventDefault();


    }
    return (



        <Paper className={classes.formContainer} elevation={4}>

            <h1>Reset Password</h1>
            <h3>Enter Email Id to reset Password</h3>
            <input className={classes.Forgetpassword} type="email" placeholder="JohnDoe@Yahoo.com" />
            <input className={classes.Forgetpassword} type="password" placeholder="Old Password" />
            <input className={classes.Forgetpassword} type="password" placeholder="New Password" />
            <button className={classes.Forgetbuttonn} onClick={submithandler} type="submit">Submit</button>

        </Paper>


    )

}

export default ForgetPass;