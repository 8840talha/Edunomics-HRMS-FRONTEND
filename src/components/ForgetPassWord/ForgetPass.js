import React, {useState} from 'react'
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setnewPassword] = useState('');

    const classes = userStyle();
    const submithandler = (event) => {
        event.preventDefault();
        var data = JSON.stringify({
            "email":email,
            "password":password,
            "newPassword":newpassword
        })
        console.log(data);
        fetch('https://hrms-project.herokuapp.com/api/reset', { method: 'put', body: data, headers: { "Content-Type": "application/json" } })
            .then(res => {
                //console.log(res);
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {

                //console.log(response);
                if(response.success === 'true') {
                    alert('Password changed successfully')
                } else {
                    alert('Some error occurred. Wrong email or password')
                }
            })
            .catch(err => {
                console.log(err.message);
                if (err.message == 401 || err.message == 404) {
                    alert('wrong email or password');
                } else {
                    alert('Some error occurred. Try again later')
                }

            })

    }
    return (



        <Paper className={classes.formContainer} elevation={4}>

            <h1>Reset Password</h1>
            <h3>Enter Email Id to reset Password</h3>
            <input className={classes.Forgetpassword} type="email" placeholder="JohnDoe@Yahoo.com" value={email} onChange={(e) => { setEmail(e.target.value) }}/>
            <input className={classes.Forgetpassword} type="password" placeholder="Old Password" value={password} onChange={(e) => { setPassword(e.target.value) }}/>
            <input className={classes.Forgetpassword} type="password" placeholder="New Password" value={newpassword} onChange={(e) => { setnewPassword(e.target.value) }}/>
            <button className={classes.Forgetbuttonn} onClick={submithandler} type="submit">Submit</button>

        </Paper>


    )

}

export default ForgetPass;