import React from 'react'
import { Popper } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
const userStyle = makeStyles(theme => ({
    pop: {
        width: '50%',
        height: '50%',
        border: '0.063rem solid green',
        textAlign: 'center',
        backgroundColor: '#fff'

    },
    inputt: {
        width: '25%',
        borderRadius: '0.313rem',
        border: '0.063rem solid green',
        height: '3.125rem',
        textDecoration: 'none'
    },
    butn: {
        width: '25%',
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
const Expand = (props) => {
    const classes = userStyle();

    return (

        <Popper placement="right-end" className={classes.pop} anchorEl={props.anchorEl} id={props.id} open={props.open}>
            <div>
                <h1>Forgot Password</h1>
                <h3>Enter Email Id to reset Password</h3>
                <input className={classes.inputt} type="email" placeholder="JohnDoe@Yahoo.com" />
                <button className={classes.butn} type="submit">Submit</button>
            </div>
        </Popper>

    );



}

export default Expand;