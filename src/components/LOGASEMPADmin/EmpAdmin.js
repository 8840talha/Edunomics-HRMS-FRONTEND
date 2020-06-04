import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    p1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: theme.spacing(25),
    },
    paperContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: theme.spacing(20)
    },
    a: {
        textDecoration: 'none'
    }

}));

const EmpAdmin = (props) => {
    const classes = useStyle();
    return (
        <div className={classes.paperContainer}>
            <Paper elevation={24} className={classes.p1}>
                <h1 ><a className={classes.a} href="/empLogin">Login As Employee</a></h1>

            </Paper>
            <Paper elevation={24} className={classes.p1}>
                <h1 ><a className={classes.a} href="/adminLogin">Login As Admin</a></h1>
            </Paper>
        </div>
    )

}

export default EmpAdmin; 
