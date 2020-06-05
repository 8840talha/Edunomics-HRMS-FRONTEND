import React, { useState } from 'react'
import './Track.css'
import { NavLink, Redirect } from 'react-router-dom'


const Track = (props) => {

    const token = localStorage.getItem('token');
    console.log(token)
    var login = true;
    if (token == null) {
        login = false;
    }
    const [loggedIn, setLogin] = useState(login)

    if (loggedIn === false) {
        return <Redirect to="/" />
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogin(!login)

    }

    return (
        <div>

            <div className="container">
                <div style={{ top: '12.5rem', left: '-5rem', position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                    <NavLink className="link" to='/update'  >Update Progress</NavLink>
                    <   NavLink className="link" to='/leave' >Leave Track</NavLink>
                </div>

                <h1> 'Click / Toggle On the Buttons to Get the views .' </h1>
                <button style={{ border: 'none', backgroundColor: 'green', color: '#fff', width: '150px', height: '50px' }} onClick={handleLogout}>LogOut</button>

                <div style={{ top: '6.25rem', right: '-11.25rem', position: 'absolute', display: 'flex', flexDirection: 'column' }} >
                    <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../assets/edunomics.png')} />
                    <NavLink to='/mydetails' style={{ marginTop: '0.625rem', }} className="link"  >My Details</NavLink>
                    <NavLink to='/myrecords' className="link"  >My Record</NavLink>
                </div>

            </div>
        </div>





    )

}

export default Track;