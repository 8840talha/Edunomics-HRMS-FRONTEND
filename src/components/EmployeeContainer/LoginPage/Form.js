import React, { useState } from 'react'

import { Paper } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import { withRouter, Redirect } from 'react-router-dom';

import './Form.css'
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(15),
        marginLeft: theme.spacing(20),
        marginBottom: theme.spacing(4),
        borderRadius: '0.938rem',
        display: 'flex',
        justifyContent: 'space-around',

        width: '55%',
        height: '100%',
    },
    listContainer: {
        display: 'flex',
    },
    form: {
        width: '350px',
        padding: theme.spacing(2),
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column'
    }, label: {
        fontSize: '2.5rem',
        color: '#57b846',

    },
    inp: {

        borderRadius: '25px',
        border: '0.063rem solid #57b846',
        height: '3.125rem',
        marginBottom: '10px',
        outline: 'none'
    },
    check: {
        width: '13px',
        height: '13px',
        padding: '0',
        margin: '0',
        verticalAlign: 'bottom',
        position: 'relative',
        top: '-5px',
        overflow: 'hidden'
    }

}));




const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const token = localStorage.getItem('token');
    console.log(token)
    var login = true;
    if (token == null) {
        login = false;
    }
    const [loggin, setLogin] = useState(login);
    if (loggin) {
        return <Redirect to="/track" />
    }
    const submithandle = (event) => {
        event.preventDefault();

        var data = JSON.stringify({
            "email": email,
            "password": password
        });
        console.log(data);

        fetch('https://hrms-project.herokuapp.com/api/login', { method: 'post', body: data, headers: { "Content-Type": "application/json" } })
            .then(res => {
                console.log(res);
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {

                console.log(response);
                localStorage.setItem('token', response.token);

                props.history.push('/track');
            })
            .catch(err => {
                console.log(err.message);
                if (err.message == 401) {
                    alert('wrong email or password');
                } else {
                    alert('Some error occurred. Try again later')
                }

            })


    }

    const classes = useStyle();


    return (

        <Paper className={classes.root} elevation={6}>


            <form onSubmit={submithandle} className={classes.form}>
                <label className={classes.label}>Login Id</label>
                <input className={classes.inp} type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <label className={classes.label}>Pass word</label>
                <input className={classes.inp} type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <label style={{ display: 'block' }}>Remember me<input className={classes.check} type="checkbox" /></label>
                <button className='butonn'>Submit</button>
                <h3><a style={{ color: 'black' }} href="/forget">Reset Password</a></h3>

            </form>
            <div style={{ marginTop: '100px' }}>
                <img alt="LoginLogo" src={require('../../../assets/edunomics.png')} />
            </div>


        </Paper>








    )

}

export default withRouter(LoginForm);




