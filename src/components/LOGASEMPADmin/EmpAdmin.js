import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import './style.css'

const useStyle = makeStyles((theme) => ({


}));

const EmpAdmin = (props) => {
    const classes = useStyle();
    return (
        <div >
            <div className="split left">
                <div className="centered">

                    <h2>Login AS Employee</h2>
                    <a href="/empLogin"><button className="buton">Login</button></a>
                </div>
            </div>


            <div className="split right">
                <div className="centered">

                    <h2>Login As Admin</h2>
                    <a href="/adminLogin"><button className="buton">Login</button></a>
                </div>
            </div>
        </div>
    )

}

export default EmpAdmin; 
