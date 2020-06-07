import React, { useState } from 'react'
import './Track.css'
import { NavLink, Redirect } from 'react-router-dom'


const Track = (props) => {
    // protected route logic
    const token = localStorage.getItem('token');
    console.log(token)
    var login = true;
    if (token == null) {
        login = false;
    }
    const [loggedIn, setLogin] = useState(login)

    if (loggedIn === false) {
        return <Redirect to="/empLogin" />
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogin(!login)

    }
    // 

    return (
        <div>

            <div className="Tcontainer">
                <div className="up">
                    <NavLink className="link" to='/update'  >Update Progress</NavLink>
                    <   NavLink className="link" to='/leave' >Leave Track</NavLink>
                </div>

                <h1> 'Click / Toggle On the Buttons to Get the views .' </h1>
                <button className="Lout" onClick={handleLogout}>LogOut</button>

                <div className="down" >
                    <div className="ImgContainer">
                        <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../assets/profile.png')} />
                        <NavLink style={{ textAlign: 'center' }} to="/detailChange" >Edit Profile</NavLink>
                    </div>
                    <NavLink to='/mydetails' style={{ marginTop: '0.625rem', }} className="link"  >My Details</NavLink>
                    <NavLink to='/myrecords' className="link"  >My Record</NavLink>
                </div>

            </div>
        </div>





    )

}

export default Track;